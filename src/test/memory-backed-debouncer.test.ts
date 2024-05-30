import { expect } from 'chai';
import sinon from 'sinon';
import { ChatMessageHistory } from 'langchain/stores/message/in_memory';
import { HumanMessage } from '@langchain/core/messages';

import { MemoryBackedDebouncer } from '../lib/utils/memory-backed-debouncer.js';

describe('MemoryBackedDebouncer', function () {
  let clock: sinon.SinonFakeTimers;

  beforeEach(function () {
    clock = sinon.useFakeTimers();
  });

  afterEach(function () {
    clock.restore();
  });

  it('should debounce messages correctly and call onTriggerComplete after cleanup time', async function () {
    let triggerFlag = false;
    const debouncer = MemoryBackedDebouncer.getInstance({
      memory: new ChatMessageHistory(),
      userId: 'test',
      onTrigger: async function () {
        triggerFlag = true;
      },
      onTriggerError: function (error) {
        console.error('Trigger error:', error.message);
      },
      onTriggerComplete: function () {
        console.log('Trigger complete');
      },
      cleanupTimeMs: 1000,
      debounceTimeMs: 100,
    });

    const onTriggerSpy = sinon.spy(debouncer, 'queueMessage');

    await debouncer.queueMessage(new HumanMessage('Hello'));
    await clock.tickAsync(50);
    await debouncer.queueMessage(new HumanMessage('How are you?'));
    await clock.tickAsync(50);
    expect(triggerFlag).to.be.false;
    await debouncer.queueMessage(new HumanMessage('Ok'));
    await clock.tickAsync(100);

    expect(triggerFlag).to.be.true;
    expect(onTriggerSpy.callCount).to.equal(3);
    const messages = await debouncer.memory.getMessages();
    expect(messages).to.have.lengthOf(3);
    expect(messages[0].content).to.equal('Hello');
    expect(messages[1].content).to.equal('How are you?');
    expect(messages[2].content).to.equal('Ok');

    await clock.tickAsync(1000);

    expect(MemoryBackedDebouncer.instances.size).to.equal(0);

    onTriggerSpy.restore();
  });
});
