import { RunnableMap } from '@langchain/core/runnables';
import { ServiceIndexDAO } from '../../db/service-index-dao.js';
export const getServicesStringifiedLong = RunnableMap.from({
    services_str: (input) => ServiceIndexDAO.Service.getServicesLong().then((services) => services.join('\n')),
}).withConfig({ runName: 'get_services_stringified_long' });
