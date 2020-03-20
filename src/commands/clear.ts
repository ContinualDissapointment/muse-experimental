import {Message} from 'discord.js';
import {TYPES} from '../types';
import {inject, injectable} from 'inversify';
import QueueManager from '../managers/queue';
import Command from '.';

@injectable()
export default class implements Command {
  public name = 'clear';
  public aliases = ['c'];
  public examples = [
    ['clear', 'clears all songs in queue except currently playing']
  ];

  public requiresVC = true;

  private readonly queueManager: QueueManager;

  constructor(@inject(TYPES.Managers.Queue) queueManager: QueueManager) {
    this.queueManager = queueManager;
  }

  public async execute(msg: Message, _: string []): Promise<void> {
    this.queueManager.get(msg.guild!.id).clear();

    await msg.channel.send('clearer than a field after a fresh harvest');
  }
}