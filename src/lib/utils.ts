import { Channel } from 'discord.js';

import { NamedChannel } from './interfaces';

export function isNamedChannel(channel: Channel): channel is NamedChannel {
  return channel.type === 'text';
}
