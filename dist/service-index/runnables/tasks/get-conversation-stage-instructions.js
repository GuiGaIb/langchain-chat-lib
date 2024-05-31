import { RunnableMap } from '@langchain/core/runnables';
import { ServiceIndexDAO } from '../../db/service-index-dao.js';
export const getConversationStageInstructions = RunnableMap.from({
    stage_instructions: (input) => ServiceIndexDAO.ConversationStage.findOne({
        numeral: input.conversation_stage,
    })
        .orFail(new Error(`Conversation stage with numeral ${input.conversation_stage} not found`))
        .exec()
        .then(({ instructions }) => instructions),
}).withConfig({ runName: 'get_conversation_stage_instructions' });
