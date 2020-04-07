import { Node, NodeProperties } from 'node-red';
import { Stream } from 'stream';

import {
  Client,
  ColorResolvable,
  DMChannel,
  GuildMember,
  Message,
  NewsChannel,
  Permissions,
  PermissionString,
  TextChannel,
  User,
} from 'discord.js';

export interface IConnectConfig extends Node {
  credentials: {
    token: string;
  };
  token?: string;
}

export interface IGetMessageConfig extends Node {
  token: string;
  channels: string;
}

export interface ISendMessageProps extends NodeProperties {
  token: string;
  channel: string;
}

export interface IGetMemberRoleConfig extends Node {
  token: string;
  serverId: string;
  roleId: string;
}

export interface IBot extends Client {
  numReferences?: number;
}

export interface ICallback {
  event: string;
  listener: (param: any) => void;
}
export type NamedChannel = TextChannel;

export interface IFromDiscordMsg {
  _msgid: string;
  payload: string;
  channel: NamedChannel | DMChannel | NewsChannel;
  author: User;
  member: GuildMember | null;
  memberRoleNames: string[] | null;
  attachments?: IFile[];
  rawData?: Message;
}

export interface IMessage {
  payload: string;
}

export interface IFile {
  filename: string;
  href: string;
}

export interface IAttachment {
  name: string;
  file: string | Buffer | Stream;
}

export interface IToDiscordChannel {
  channel?: string;
  payload: string;
  rich?: IRichEmbedArgs;
  attachments?: IAttachment[];
}

export interface IMentionMap {
  id: string;
  name: string;
}

export interface IRichEmbedArgs {
  title?: string;
  description?: string;
  url?: string;
  color?: ColorResolvable;
  timestamp?: number | Date;
  footer?: {
    icon?: string;
    text: string;
  };
  thumbnail?: string;
  author: {
    name: string;
    icon?: string;
    url?: string;
  };

  attachments?: any;
  field?: IRichEmbedField;
  fields?: IRichEmbedField[];
}

interface IRichEmbedField {
  name: string;
  value: string;
  inline?: boolean;
}

export interface IChannelMetric {
  [id: string]: ITextChannelMetric[];
}

export interface ITextChannelMetric {
  id: string;
  channelName: string;
  members: IMetricMemberItem[];
}

export interface IMetricRoleItem {
  id: string;
  name: string;
  permissions: Readonly<Permissions>;
}

export interface IMetricMemberItem {
  id: string;
  username: string;
  joinedDate: Date | null;
  permissions: PermissionString[];
  roles: IMetricRoleItem[];
}
