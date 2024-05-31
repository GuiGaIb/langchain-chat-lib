import { RunnableMap } from '@langchain/core/runnables';

import { ServiceIndexDAO } from '../../db/service-index-dao.js';

export const getServicesStringifiedShort = RunnableMap.from<
  {
    service_names: string[];
  },
  {
    services_str: string;
  }
>({
  services_str: (input) =>
    ServiceIndexDAO.Service.getServicesShort().then((services) =>
      services.join('\n')
    ),
}).withConfig({ runName: 'get_services_stringified_short' });
