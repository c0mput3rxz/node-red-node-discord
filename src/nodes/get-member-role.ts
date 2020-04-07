import { GuildMember, Role } from 'discord.js';
import { Node, Red } from 'node-red';
import { Bot } from '../lib/Bot';
import {
  IBot,
  IConnectConfig,
  IGetMemberRoleConfig,
  IMessage,
} from '../lib/interfaces';
// @ts-ignore
import Flatted = require('flatted');

export = (RED: Red) => {
  RED.nodes.registerType('discord-get-member-role', function(
    this: Node,
    props: IGetMemberRoleConfig,
  ) {
    RED.nodes.createNode(this, props);
    const configNode = RED.nodes.getNode(props.token) as IConnectConfig;
    const { token } = configNode;
    const node = this;
    const botInstance = new Bot();
    const rawRoleIds = props.roleId;
    // @ts-ignore
    const roleIds =
      rawRoleIds.length > 0
        ? rawRoleIds
            .split('#')
            .map((e: string) => e.trim())
            .filter((e: string) => e !== '')
        : [];
    const serverId = props.serverId;

    // @ts-ignore -> send is never used
    this.on('input', (msg: IMessage, send, done) => {
      node.status({ fill: 'green', shape: 'dot', text: 'ready' });
      // tslint:disable-next-line:no-console
      console.log('TEST', token);
      // @ts-ignore
      const userId = msg.payload;
      if (token) {
        botInstance
          .get(token)
          .then((bot: IBot) => {
            // tslint:disable-next-line:no-console
            console.log('Bot', bot);
            const guild = bot.guilds.resolve(serverId);
            const guildMemberPromise = guild!!.members.fetch(
              '639178210235514900',
            );
            guildMemberPromise.then((guildMember: GuildMember) => {
              // tslint:disable-next-line:no-console
              console.log('Guild Member', guildMember);
              // tslint:disable-next-line:no-console
              console.log(
                'Guild Member ROLES',
                guildMember.roles.cache.values(),
              );
              msg.payload = Flatted.parse(
                Flatted.stringify(
                  guildMember.roles.cache.get('696073400338350081') as Role,
                ),
              );
              node.send(msg);
            });
            // if (guild) {
            //   msg.payload = Flatted.parse(Flatted.stringify(guildMember));
            //   node.send(msg);
            // } else {
            //   msg.payload = 'NULL GUILD';
            //   node.send(msg);
            // }
            // node.send(Flatted.parse(Flatted.stringify(guild.members.cache.get(userId))));
            // let isMod = 'false';
            // roleIds.forEach((role) => {
            //   if (guild.members.cache.get(userId)!.roles.cache.has(role)) {
            //     this.debug('User matches one of the roles!');
            //     isMod = 'true';
            //   }
            // });
            // node.send(Flatted.parse(Flatted.stringify(guild.members)));
            // const guildMemberResolvable = (guild.members.resolve('639178210235514900') as GuildMemberResolvable);
            // const guildMember = (guild.members.resolve(guildMemberResolvable) as GuildMember);
            if (done) {
              done();
            }
            node.on('close', () => {
              botInstance.destroy(bot);
            });
          })
          .catch((err: Error) => {
            node.error(err);
            node.status({ fill: 'red', shape: 'dot', text: 'wrong token?' });
          });
      } else {
        this.error('Access token not specified');
      }
    });
  });
};
