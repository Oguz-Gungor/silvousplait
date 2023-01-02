export interface ChunkExecutorProperties {
  executor: (...args: any[]) => void;
  maxPayloadSize?: number;
  delayBetweenCalls?: number;
}

interface ChunkExecutorElement extends ChunkExecutorProperties {
  payload?: any[];
  timeout: NodeJS.Timeout;
}

export class ChunkExecutor {
  private chunkMap: {
    [key: string]: ChunkExecutorElement;
  };

  public startGather(
    key: string,
    { executor, maxPayloadSize, delayBetweenCalls }: ChunkExecutorProperties
  ) {
    const delay = delayBetweenCalls || 50;
    const chunkSize = maxPayloadSize || 50;
    this.chunkMap[key] = {
      executor,
      maxPayloadSize: chunkSize,
      delayBetweenCalls: delay,
      timeout: this.setChunkTimer(executor, delay),
      payload: [],
    };
  }

  public addToChunk(key: string, payload: any) {
    this.chunkMap[key].payload.push(payload);
    const {
      executor,
      timeout,
      delayBetweenCalls,
      payload: chunkPayload,
      maxPayloadSize,
    } = this.chunkMap[key];
    this.chunkMap[key].timeout = this.setChunkTimer(
      executor,
      delayBetweenCalls,
      timeout,
      chunkPayload,
      maxPayloadSize
    );
  }

  private setChunkTimer(
    executor: (...args: any[]) => void,
    delay,
    existingTimer?: NodeJS.Timeout,
    payload?: any[],
    maxChunkSize?: number
  ) {
    if (existingTimer) {
      clearTimeout(existingTimer);
      if (payload.length >= maxChunkSize) {
        executor(payload.splice(0));
      }
    }
    const timeout = setTimeout(() => {
      executor(payload);
      clearTimeout(timeout);
    }, delay);
    return timeout;
  }
}
