import { RunnableMap } from '@langchain/core/runnables';

import { ServiceIndexDAO } from '../../db/service-index-dao.js';

export const getConversationStagesStringified = RunnableMap.from<
  any,
  {
    conversation_stages_str: string;
  }
>({
  conversation_stages_str: () =>
    ServiceIndexDAO.ConversationStage.getStringifiedStages(),
}).withConfig({ runName: 'get_conversation_stages_stringified' });
