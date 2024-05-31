process.env['OPENAI_API_KEY'] =
  'sk-proj-gAziJ3QnUXOZIsVEim7gT3BlbkFJrjEW0NZJ4mfGU45Sckj7';
process.env['SUMMARIZATION_OPENAI_MODEL'] = 'gpt-4o';
process.env['SUMMARIZATION_OPENAI_TEMPERATURE'] = '0.5';
process.env['BASE_OPENAI_MODEL'] = 'gpt-3.5-turbo';
process.env['BASE_OPENAI_TEMPERATURE'] = '0.7';
process.env['FIXING_OPENAI_MODEL'] = 'gpt-3.5-turbo';

process.env['LCCHAT_MONGO_URI'] =
  'mongodb+srv://guigaibmex:O07gV3wqOQcSitg4@devcluster.0mxnzqg.mongodb.net/test_v2?retryWrites=true&w=majority&appName=DevCluster';

process.env['LANGCHAIN_API_KEY'] =
  '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';
process.env['LANGCHAIN_ENDPOINT'] = 'https://api.smith.langchain.com';
process.env['LANGCHAIN_TRACING_V2'] = 'true';
process.env['LANGCHAIN_CALLBACKS_BACKGROUND'] = 'true';

// import { HumanMessage, AIMessage } from '@langchain/core/messages';

// import { inputMap } from './lib/service-index/runnables/get-conversation-stage.js';

// const response = await inputMap.invoke({
//   chat_context: `The user's name is Guillermo.\nHe likes pizza and football.`,
//   chat_messages: [
//     new HumanMessage('Hello there!'),
//     new AIMessage('Hi! How can I help you today?'),
//     new HumanMessage('I need help with my order.'),
//   ],
//   stages: [
//     {
//       n: 1,
//       name: 'Greeting',
//       description:
//         'Customer service representative greets the user and asks how they can help.',
//       instructions: 'Greeting',
//       requirements: ['This stage should be selected every time the conversation starts.'],
//     },
//     {
//       n: 2,
//       name: 'Identify need',
//       description:
//         'Customer service must identify the user\'s need and ask questions to understand the problem',
//       instructions: 'Identify need',
//       requirements: ['This stage should be selected when the user asks for help.'],
//     },
//     {
//       n: 3,
//       name: 'Objections',
//       description: 'Customer service must address any objections the user has.',
//       instructions: 'Objections',
//       requirements: ['This stage should be selected when the user expresses doubts, concerns, or objections.'],
//     }
//   ],
// });

// console.log(response);

/* ------------------------------------------------------------------------------------------------ */
// import { AIMessage, HumanMessage } from '@langchain/core/messages';

// const { MongoChatSessionMemory } = await import(
//   './lib/memory/mongodb/mongo-chat-session-memory.js'
// );

// const memory = new MongoChatSessionMemory({
//   userId: 'test',
//   maxMessageCount: 10,
//   messageCountToSummarize: 5,
//   includeStaleSessions: false,
// });

// process.env['MESSAGE_DEBOUNCE_CLEANUP_TIME_MS'] = String(1000 * 60);
// process.env['MESSAGE_DEBOUNCE_TIME_MS'] = String(1000 * 5);

// const { MemoryBackedDebouncer } = await import(
//   './lib/utils/memory-backed-debouncer.js'
// );

// const debouncer = MemoryBackedDebouncer.getInstance({
//   memory,
//   async onTrigger() {
//     const messages = await this.memory.getMessages();
//     const count = messages.length;
//     console.log('Triggered!', 'message count:', count);
//   },
//   userId: memory.userId,
// });

// const startingMessages = [
//   new HumanMessage('Hello there!'),
//   new AIMessage('Hi! How can I help you today?'),
//   new HumanMessage('I need help with my order.'),
//   new AIMessage('Sure! What can I help you with?'),
//   new HumanMessage('I need to cancel my order.'),
//   new AIMessage(
//     'I can help you with that. Please provide me with your order number.'
//   ),
//   new HumanMessage('123456'),
// ];

// for (const message of startingMessages) {
//   await debouncer.queueMessage(message);
// }

// await stall(1000 * 5);
// await memory.addMessage(
//   new AIMessage('Thank you. Your order has been successfully canceled.')
// );

// await debouncer.queueMessage(new HumanMessage('Thank you!'));
// await stall(1000);
// await debouncer.queueMessage(
//   new HumanMessage('Can you help me create a new order?')
// );
// await stall(1000 * 2);
// await debouncer.queueMessage(new HumanMessage('I would like to see the menu.'));

// await stall(1000 * 5);
// await memory.addMessage(
//   new AIMessage(
//     'Of course! You will find the menu at this link: https://example.com/menu'
//   )
// );

// await stall(1000 * 1);
// await memory.summarizeMessages();
// const summary = await memory.getSummaryAsText();
// console.log('Summary:', summary);

// debouncer.terminate();

// await memory.ChatMessage.db.close();

// function stall(ms: number) {
//   return new Promise((resolve) => setTimeout(resolve, ms));
// }

/* ------------------------------------------------------------------------------------------------ */
// import { AIMessage, HumanMessage } from '@langchain/core/messages';
// const { getConversationStage } = await import(
//   './service-index/runnables/tasks/get-conversation-stage.js'
// );

// const startingMessages = [
//   new HumanMessage('Hello there!'),
//   new AIMessage('Hi! How can I help you today?'),
//   new HumanMessage('I need help with my order.'),
//   new AIMessage('Sure! What can I help you with?'),
//   new HumanMessage('I need to cancel my order.'),
//   new AIMessage(
//     'I can help you with that. Please provide me with your order number.'
//   ),
//   new HumanMessage('123456'),
//   new AIMessage('Thank you. Your order has been successfully canceled.'),
//   new HumanMessage('Can you help me create a new order?'),
//   new HumanMessage('I would like to see the menu.'),
//   new HumanMessage('Never mind, you are too slow!'),
// ];

// const { MongoChatSessionMemory } = await import(
//   './lib/memory/mongodb/mongo-chat-session-memory.js'
// );

// const memory = new MongoChatSessionMemory({
//   userId: 'test',
//   maxMessageCount: 5,
//   messageCountToSummarize: 3,
//   includeStaleSessions: false,
// });

// await memory.ChatMessage.deleteMany({ userId: memory.userId });
// await memory.Session.deleteMany({ userId: memory.userId });

// for (const message of startingMessages) {
//   await memory.addMessage(message);
// }

// const { unpackChatMemoryWithSummary } = await import(
//   './lib/memory/utils/unpack-memory.js'
// );

// const unpackedMemory = await unpackChatMemoryWithSummary.invoke(memory);

// const response = await getConversationStage.invoke({
//   ...unpackedMemory,
//   conversation_stages_str: `1 - Greeting: Customer service representative greets the user and asks how they can help.
// 2 - Identify need: Customer service must identify the user's need and ask questions to understand the problem.
// 2.1 - Get need details: Customer service must ask questions to fully understand the user's need and its details.
// 3 - Resolve need: Customer service must resolve the user's need and provide a solution.
// 4 - Objections: Customer service must address any objections the user has.
// 5 - Closing: Customer service must close the conversation.`,
// });

// console.log(response);

// await memory.ChatMessage.db.close();
/* ------------------------------------------------------------------------------------------------ */

/* ------------------------------------------------------------------------------------------------ */
// import { ChatPromptTemplate } from '@langchain/core/prompts';

// const prompt = ChatPromptTemplate.fromMessages([['system', '{var1}']]);

// const response = await prompt.invoke({
//   var1: JSON.stringify({
//     a: 1,
//     b: '2',
//     c: null,
//   }),
// });

// console.log(response);
/* ------------------------------------------------------------------------------------------------ */

/* ------------------------------------------------------------------------------------------------ */
/* ------------------------------------------------------------------------------------------------ */
// const { ServiceIndexDAO } = await import(
//   './service-index/db/service-index-dao.js'
// );
// import type { ServiceShape } from './service-index/db/schemas/service.schema.js';

// const services: ServiceShape[] = [
//   {
//     name: 'Asesoría para Visa de Turista B1/B2.',
//     short_description:
//       'Para extranjeros que deseen ingresar a EE.UU. temporalmente por negocios, turismo, o ambos. Permite actividades como consultas comerciales, asistencia a eventos, turismo, y tratamiento médico, entre otros. No apta para estudiar, empleo, actuaciones pagadas, trabajo de prensa, o residencia permanente.',
//     long_description: `"Generalmente, un ciudadano de un país extranjero que desee ingresar a los Estados Unidos primero debe obtener una visa, ya sea una visa de no inmigrante para estadía temporal o una visa de inmigrante para residencia permanente. Las visas de visitante son visas de no inmigrante para personas que desean ingresar a los Estados Unidos temporalmente por negocios, por turismo o para una combinación de ambos propósitos.

// Comúnmente se le conoce como B1 que significa Business o Negocios y B2 que significa pleasure o placer, no siempre es aplicable una Visa B1/B2 para todas las nacionalidades, pero para las personas de nacionalidad mexicana si es aplicable. En caso de ser un país de distinta nacionalidad, se deberá especificar si será para fines vacacionales o recreativos o bien, busca también para fines de negocios.

// Algunos ejemplos de las actividades permitidas con una visa de visitante incluyen:
// * Consultar con socios comerciales.
// * Asistir a una convención o conferencia científica, educativa, profesional o de negocios.
// * Liquidar una propiedad
// * Negociar un contrato
// * Turismo
// * Vacaciones
// * Visita con amigos o familiares.
// * Tratamiento médico
// * Participación en eventos sociales organizados por organizaciones fraternales, sociales o de servicios.
// * Participación de aficionados en eventos o concursos musicales, deportivos o similares, si no se les paga por participar.
// * Inscripción en un curso de estudio recreativo corto, que no sea para obtener crédito para obtener un título (por ejemplo, una clase de cocina de dos días durante las vacaciones)

// Estos son algunos ejemplos de actividades que requieren diferentes categorías de visas y no se pueden realizar con una visa de visitante:
// * Estudiar
// * Empleo
// * Actuaciones pagadas o cualquier actuación profesional ante una audiencia de pago.
// * Llegada como tripulante de un barco o avión
// * Trabajar como prensa extranjera, en radio, cine, periodismo impreso u otros medios de información.
// * Residencia permanente en los Estados Unidos

// Tampoco se emitirán visas de visitante para turismo de nacimiento (viajes con el objetivo principal de dar a luz en los Estados Unidos para obtener la ciudadanía estadounidense para su hijo).

// Si el solicitante desea programa una cita de asesoría, es necesario enviar el siguiente enlace: https://www.mexusmigracion.com/politicas-de-citas/
// "`,
//     requirements: [
//       'Para asesoría no es necesario contar con pasaporte vigente, pero para solicitar la visa es necesario contar con pasaporte vigente.',
//       'Solicitante no debe contar con antecedentes en USA como deportaciones, revocaciones de visa, estancia ilegal en USA, etc.',
//     ],
//     cost: 'En caso de que el aplicante pregunte sobre nuestros costos por concepto de honorarios o más información en referencia a pagos del proceso o servicio, favor de enviar el siguiente enlace: https://www.mexusmigracion.com/tabulador-honorarios-mexus. Costo de Asesoria $1,000 pesos mexicanos.',
//     tags: ['visa', 'turista', 'asesoría'],
//   },
//   {
//     name: `Asesoría con Abogado Americano para: H-1B, H2-A, L-1A, L-1B, E-1, E-2, Certificaciones Laborales ante DOL (PERM), Form I-140, Ajuste de Status Migratorio.`,
//     short_description: `"Incluye categorías como H-1B para ocupaciones especializadas, H-2A/B para trabajadores agrícolas/no agrícolas temporales, y otras. Requiere empleador en EE.UU. con oferta laboral válida. También cubre visas E-1/E-2 para comerciantes e inversores por tratado.

// Incluye asesoría de Ajuste de Status Migratorio por vínculo familiar cuando el aplicante se encuentre dentro de Estados Unidos.
// "`,
//     long_description: `"Las categorías de visas de trabajo temporal incluyen:
// * H-1B: Persona en Ocupación Especializada - Para solicitantes que trabajan en una ocupación especializada. Los solicitantes deben tener al menos una licenciatura o experiencia equivalente en la ocupación especializada. Incluye modelos, médicos y participantes en proyectos del DOD.
// * H-2A: Trabajador agrícola temporal - Para solicitantes que realicen trabajos agrícolas temporales o estacionales.
// * H-2B: Trabajador temporal no agrícola - Para solicitantes que realizan trabajos no agrícolas temporales o estacionales.
// * H-3: Aprendiz o visitante de educación especial - Para solicitantes que reciben capacitación, distinta de la formación académica o médica de posgrado, en cualquier campo que no esté disponible en su país de origen. Los solicitantes también podrán participar en programas de formación práctica en la educación de niños con discapacidad mental, física o emocional.
// * L: Cesionario intracompañía - Para solicitantes que trabajan en una capacidad gerencial o ejecutiva; o solicitantes que trabajan en un puesto que requiere conocimientos especializados. El peticionario debe ser una sucursal, matriz, filial o subsidiaria del empleador actual del solicitante. Los solicitantes deben haber trabajado para el mismo empleador en el extranjero durante 1 año dentro de los tres años anteriores.

// El primer requisito para tramitar cualquier tipo de visa de trabajo, es tener ya tu empleador en Estados Unidos y contar con una oferta laboral válida y oficial de tu empleador. MEXUSMigración no es bolsa de trabajo, no ofrece empleo ni consigue empleador.

// Otro tipo de visa son las visas de comerciante por tratado e inversor por tratado (E-1 y E-2).

// Para calificar para una visa de comerciante por tratado (E-1):
// * Debe ser ciudadano de un país con tratado.
// * La empresa estadounidense (empresa comercial) para la cual planea venir a los Estados Unidos debe tener la nacionalidad del país del tratado.
// * Para que una empresa tenga la nacionalidad de un país del tratado, al menos el 50 por ciento de la empresa o entidad debe ser propiedad de personas con la nacionalidad del país del tratado.
// * Usted o la empresa estadounidense (empresa comercial) llevarán a cabo un comercio internacional sustancial, lo que significa que existe un volumen de comercio considerable y continuo; Más del 50 por ciento del comercio internacional involucrado debe realizarse entre Estados Unidos y el país del tratado.
// * Comercio significa el intercambio internacional de bienes, servicios y tecnología.
// * Si usted no es el comerciante del tratado, debe estar empleado en una capacidad de supervisión o ejecutiva, o poseer habilidades especializadas esenciales para el funcionamiento eficiente de la empresa estadounidense (empresa comercial).
// * Debe tener la intención de salir de los EE. UU. cuando expire su estatus E-1.

// Para calificar para una visa de inversionista por tratado (E-2):
// * Debe ser ciudadano de un país con tratado.
// * La empresa de inversión estadounidense debe tener la nacionalidad de un país signatario del tratado. Para que una empresa tenga la nacionalidad de un país del tratado, al menos el 50 por ciento de la empresa o entidad debe ser propiedad de personas con la nacionalidad del país del tratado.
// * La inversión en Estados Unidos debe ser sustancial y suficiente para garantizar el funcionamiento exitoso de la empresa. Los fondos no comprometidos o revocables en una cuenta bancaria o valor similar generalmente no se consideran una inversión.
// * La empresa estadounidense debe ser una empresa comercial real y operativa.
// * La empresa debe generar más ingresos que solo proporcionarle la vida a usted y a su familia, o debe tener un impacto económico significativo en los Estados Unidos.
// * Si usted es el inversionista principal, debe venir a los Estados Unidos para desarrollar y dirigir la empresa. Si usted no es el inversionista principal, debe venir a los EE. UU. para trabajar en un puesto de supervisión, ejecutivo o poseer habilidades especializadas esenciales para el funcionamiento eficiente de la empresa estadounidense.
// * Debe tener la intención de salir de los EE. UU. cuando expire su estatus E-2.

// Los solicitantes de visa de comerciante por tratado (E-1) o inversionista por tratado (E-2) deben establecer que la empresa comercial o de inversión cumple con los requisitos de la ley y cumple con los muchos requisitos para la categoría de visa E. El funcionario consular puede proporcionarle formularios especiales para completar con este fin.

// El Ajuste de Estatus es el proceso que puede usar para solicitar el estatus de residente permanente legal (también conocido como solicitar una Tarjeta Verde o Green Card) cuando usted está presente en Estados Unidos. Esto significa que usted puede obtener una Tarjeta de Residente Permanente sin tener que regresar a su país de origen para completar el trámite de la visa.
// No se puede programar una asesoría con Abogado Americano enfocada a Ajuste de Status si la persona o el aplicante o el beneficiario se encuentra fuera de los Estados Unidos, en caso de que la persona se encuentre fuera de Estados Unidos y desee información es necesario referir a Asesoría para Residencia Americana por vínculo familiar directo (cónyuge, hijos menores de 21 años y padres, en caso que el peticionario sea Ciudadano Americano) o Asesoría para Residencia Americana por vínculo familiar directo (para hijos mayores de 21 años), según sea el caso. Si el solicitante desea programa una cita de asesoría, es necesario enviar el siguiente enlace: https://www.mexusmigracion.com/politicas-de-citas
// "`,
//     requirements: [
//       'Solicitante debe contar con pasaporte vigente.',
//       'Solicitante debe contaro con oferta laboral válida de empleador en EE.UU. MEXUS no es bolsa de trabajo, no ofrece empleo ni consigue empleador.',
//       'Para Ajuste de Status Migratorio, solicitante debe encontrarse dentro de EE.UU.',
//     ],
//     cost: 'En caso de que el aplicante pregunte sobre nuestros costos por concepto de honorarios o más información en referencia a pagos del proceso o servicio, favor de enviar el siguiente enlace: https://www.mexusmigracion.com/tabulador-honorarios-mexus. Costo de Asesoria $2,000 pesos mexicanos.',
//     tags: [
//       'visa',
//       'trabajo temporal',
//       'ajuste de status',
//       'abogado americano',
//       'inversionista',
//       'comerciante',
//       'visa H-1B',
//       'visa H2-A',
//       'visa L-1A',
//       'visa L-1B',
//       'visa E-1',
//       'visa E-2',
//       'asesoría',
//     ],
//   },
//   {
//     name: `Asesoría para Visa de Trabajo tipo TN`,
//     short_description: `Permite a ciudadanos de México y Canadá trabajar en EE.UU. en ocupaciones específicas del USMCA. Requiere pasaporte válido, ser ciudadano de Canadá o México, tener oferta de empleo en EE.UU., y no permite trabajo por cuenta propia y que el aplicante cuenta con Cedula y Titulo Profesional.

//     El solicitante deberá contar con Cedula y título profesional, de no contar con eso, MEXUSMigración no podrá asesorarle en la obtención de la Visa TN, a menos que una vez que se le informe que es necesario para la aplicación y el solicitante aun desea la asesoría para el trámite de visas de trabajo para Estados Unidos tipo TN.

//     Si el solicitante en ese momento no cuenta con cedula o título profesional, pero informa que próximamente la va a recibir, si es posible brindarle una asesoría para Visa de Trabajo tipo TN.`,
//     long_description: `La visa de no inmigrante USMCA Professional (TN) permite a los ciudadanos elegibles de México trabajar en los Estados Unidos como profesionales del USMCA en actividades comerciales de nivel profesional preestablecidas para empleadores estadounidenses o extranjeros. Los residentes permanentes de México no pueden solicitar visas TN para trabajar como profesionales del USMCA. El solicitante deberá contar con Cedula y título profesional, de no contar con eso, MEXUSMigración no podrá asesorarle en la obtención de la Visa TN, a menos que una vez que se le informe que es necesario para la aplicación y el solicitante aun desea la asesoría para el trámite de visas de trabajo para Estados Unidos tipo TN.

//     El solicitante debe contar con un empleador, no necesariamente el empleador deberá ser directamente una empresa americana, hay ocasiones en las cuales las empresas mexicanas desean enviar a sus trabajadores o profesionistas a Estados Unidos para desarrollar algún tipo de trabajo profesional, lo importante es que siempre exista una entidad americana, ya sea como empleadora o para recibir el beneficio por parte del profesionista vinculado a una empresa mexicana.

//     Si el solicitante en ese momento no cuenta con cedula o título profesional, pero informa que próximamente la va a recibir, si es posible brindarle una asesoría para Visa de Trabajo tipo TN.`,
//     requirements: [
//       'Solicitante debe contar con pasaporte vigente.',
//       'Solicitante debe ser ciudadano de México o Canadá.',
//       'Solicitante debe contar con oferta laboral válida de empleador en EE.UU. MEXUS no es bolsa de trabajo, no ofrece empleo ni consigue empleador.',
//       'Solicitante debe contar con Cedula y Titulo Profesional.',
//     ],
//     cost: `En caso de que el aplicante pregunte sobre nuestros costos por concepto de honorarios o más información en referencia a pagos del proceso o servicio, favor de enviar el siguiente enlace: https://www.mexusmigracion.com/tabulador-honorarios-mexus. Costo de Asesoria $1,000 pesos mexicanos.`,
//     tags: [
//       'visa',
//       'trabajo',
//       'TN',
//       'USMCA',
//       'profesional',
//       'mexico',
//       'canada',
//       'asesoría',
//     ],
//   },
//   {
//     name: `Asesoria para Visa de Prometido o Fiance (Solamente si el peticionario es Ciudadano Americano) `,
//     short_description: `Permite al prometido(a) de un ciudadano estadounidense entrar a EE.UU. para casarse (K-1) o a cónyuges para permanecer mientras se tramita la visa de inmigrante (K-3). Se requiere pasaporte válido y asegurar propósito correcto de la visa.`,
//     long_description: `"Comúnmente conocida como la Visa de Prometido, es un procedimiento que NO solamente es para prometidos, ya que la petición inicial que se realiza ante el departamento de USCIS, principalmente es para aplicar para una Visa de No Immigrante tipo K-1, cuando las personas NO están casadas, ya que la Visa tipo K-1, permite al prometido (a) entrar a Estados Unidos a casarse dentro de los primeros 90 días y existe la posibilidad de solicitar la Visa tipo K-3, cuando la pareja ya está casada para fines de estadía en Estados Unidos mientras se completa el trámite de inmigrante correspondiente que es después de haber ingresado el formulario I-130.

// Es importante que usted tenga muy claro que, este contenido referente a los Documentos de Prometido o Fiancé y Matrimonio K1-K3, es solamente información en general, pues cada caso particular es diferente. Por lo anterior, es importante que usted agende una Cita de Asesoría Migratoria, para que reciba la información completa de requisitos, tiempos aproximados y costos de su proceso, de acuerdo sus necesidades y situación particular.

// En MEXUSMigración, durante nuestra cita de asesoría para el trámite de la Visa de Prometido o Fiancé (K1) y Matrimonio (K3), le brindaremos la información completa y con total transparencia. Le daremos un estimado de duración del trámite en cada etapa, una lista de los documentos requeridos para dar inicio al trámite, los pagos que realizará a las distintas agencias del gobierno americano y la cantidad por nuestros honorarios, que se pagan en distintas fechas, conforme su trámite avance.

// Es importante señalar que el proceso para la Visa de Prometido o Fiancé NO es tan rápido como suele parecer, por tal motivo es necesario recibir una asesoría por parte del equipo de abogados y asesores de MEXUSMigración. Si el solicitante desea programa una cita de asesoría, es necesario enviar el siguiente enlace: https://www.mexusmigracion.com/politicas-de-citas.
// "`,
//     requirements: [
//       'Solicitante debe contar con pasaporte vigente.',
//       'Solicitante debe ser prometido(a) de ciudadano americano.',
//       'Solicitante debe asegurar propósito correcto de la visa.',
//     ],
//     cost: `En caso de que el aplicante pregunte sobre nuestros costos por concepto de honorarios o más información en referencia a pagos del proceso o servicio, favor de enviar el siguiente enlace: https://www.mexusmigracion.com/tabulador-honorarios-mexus. Costo de Asesoria $1,000 pesos mexicanos. `,
//     tags: [
//       'visa',
//       'prometido',
//       'fiance',
//       'matrimonio',
//       'K-1',
//       'K-3',
//       'asesoría',
//     ],
//   },
//   {
//     name: `Asesoría para Perdón Legal o Waiver, revocaciones y/o documento cancelado. (únicamente si usted desea realizar el trámite de Visa de Turista B1/B2).`,
//     short_description: `Para personas que han sido deportadas de EE.UU. o tienen problemas legales previos en EE.UU. En caso de no contar con pasaporte mexicano vigente, informar que si puede recibir una asesoria para el tramite de visa con antecedentes, pero sera necesario contar con pasaporte mexicano vigente para fines de poder iniciar algun proceso.`,
//     long_description: `"Este tipo de Asesoría es meramente para personas que desean aplicar para una Visa de No Immigrante pero cuentan con antecedentes previos en Estados Unidos, como deportaciones, expedite Removal, les han cancelado sus Visas de No-Immigrante (Withdraw of Application), vivieron de manera ilegal o bien, acumularon presencia ilegal en Estados Unidos o pudieron haber tenido algún incidente con el Gobierno de Estados Unidos similar a los antes mencionados, no todos es por alguna situación no necesariamente “mala”, sin embargo es necesaria la asesoría solamente para que el abogado pueda corroborar cual sería el siguiente paso o bien, poder validar si el aplicante cuenta con algún fundamento legal de inadmisibilidad vigente.

// Si el aplicante cuenta con algún tipo de antecedente o situación similar, no puede iniciar ningún tramite en MEXUSMigración hasta que no reciba la asesoría enfocada para Perdón Legal o Waiver, revocaciones y/o documento cancelado. (únicamente si usted desea realizar el trámite de Visa de Turista B1/B2).

// MEXUSMigración tiene una amplia experiencia en casos con antecedentes en Estados Unidos, ya que la asesoría aporta un gran valor al aplicante previo a iniciar cualquier tipo de aplicación para Visa de No-Immigrante.

// La experiencia que tiene el Lic. Diego Pérez en dichas inadmisibilidades ha sido aplicada en trámites para NO-IMMIGRANTE, donde en cada una de dichas situaciones, hemos logrado tener varios resultados positivos, ya sea para personas que alguna vez fueron removidas o deportadas formalmente, o que llegaron a vivir un tiempo de manera irregular en Estados Unidos, entre otras muchas situaciones.

// Si el solicitante desea programa una cita de asesoría, es necesario enviar el siguiente enlace: https://www.mexusmigracion.com/politicas-de-citas.
// "`,
//     requirements: [
//       'No es requisito contar con pasaporte mexicano o extranjero vigente para recibir la asesoria, pero si sera necesario para hacer el tramite.',
//     ],
//     cost: `En caso de que el aplicante pregunte sobre nuestros costos por concepto de honorarios o más información en referencia a pagos del proceso o servicio, favor de enviar el siguiente enlace: https://www.mexusmigracion.com/tabulador-honorarios-mexus. Costo de Asesoria $1,000 pesos mexicanos.`,
//     tags: [
//       'perdón legal',
//       'waiver',
//       'revocaciones',
//       'antecedentes',
//       'asesoría',
//     ],
//   },
//   {
//     name: `Asesoría para solicitud de actas de nacimiento de Estados Unidos y/o apostilles.`,
//     short_description: `Asesoría para solicitar el acta de nacimiento en EE.UU. desde México, dirigido a ciudadanos estadounidenses y para enviar documentos originales americanos para apostillarlos en la Secretaria de Estado segun sea el Estado de la emision del documento americano. Proceso para certificar la autenticidad de documentos públicos de EE.UU. para su validez en México. Requiere el documento original a apostillar.

// Normalmente suelen ser los Ciudadanos Americanos que requieren algún servicio de Asesoria de Actas de Nacimientos Americanas o Apostillados. `,
//     long_description: `Asesoría para solicitar el acta de nacimiento en EE.UU. desde México, dirigido a ciudadanos estadounidenses y para enviar documentos originales americanos para apostillarlos en la Secretaria de Estado segun sea el Estado de la emision del documento americano. Proceso para certificar la autenticidad de documentos públicos de EE.UU. para su validez en México. Requiere el documento original a apostillar.

// Normalmente suelen ser los Ciudadanos Americanos que requieren algún servicio de Asesoria de Actas de Nacimientos Americanas o Apostillados.

// La solicitud inicial se hace directamente con el departamento de VITAL RECORDS dependiendo el estado y/o condado donde la persona haya nacido, Vital Records, su función es similar al Registro Civil en México.

// Cada Estado y/o condado tiene distintos requerimientos, obviamente es mucho más sencillo realizar la solicitud desde Estados Unidos o directamente en persona o el solicitante ante Vital Records, muchas veces debido a que los familiares se encuentran en México o el interesado, entonces evidentemente es más económico realizar la solicitud desde México que viajar a Estados Unidos para sacar tu acta americana. La solicitud inicial se hace directamente con el departamento de VITAL RECORDS dependiendo el estado y/o condado donde la persona haya nacido, Vital Records, su función es similar al Registro Civil en México.

// La solicitud del apostille, es importante saber para que se está solicitando el apostille de un documento, normalmente se solicita el apostille de actas de nacimiento americanas y/o documentos similares para que sean válidos por las autoridades en México.

// El documento que se desea apostillar, deberá ser directamente en la Secretaría del Estado en Estados Unidos de donde es el documento, es decir, Acta de Nacimiento del Estado de California, el procedimiento será en la Secretaria del Estado de California.La apostilla es un procedimiento mediante el cual se certifica la autenticidad de un documento público para que tenga validez en otro país. La apostilla es un sello que se coloca en el documento original y que certifica la autenticidad de la firma y el cargo de la persona que lo ha firmado. En MEXUSMigración podemos asesorarle en la obtención de la apostilla de documentos de Estados Unidos para que tengan validez en México.

// En MEXUS Migración ya no llevamos el proceso completo para la solicitud del Acta de Nacimiento Americana o Apostille, pero si podemos apoyar a las personas con la Asesoría, es decir, MEXUS no brinda el servicio de solicitar el Acta Americana o enviar los documentos originales a apostillar.Si el solicitante desea programa una cita de asesoría, es necesario enviar el siguiente enlace: https://www.mexusmigracion.com/politicas-de-citas.
// "`,
//     requirements: [
//       'Solicitante debe contar con documento original a apostillar.',
//       'Documento para apositllar debe ser emitido únicamente por autoridades estadounidenses',
//     ],
//     cost: `En caso de que el aplicante pregunte sobre nuestros costos por concepto de honorarios o más información en referencia a pagos del proceso o servicio, favor de enviar el siguiente enlace: https://www.mexusmigracion.com/tabulador-honorarios-mexus. Costo de Asesoria $1,000 pesos mexicanos.`,
//     tags: ['acta de nacimiento', 'apostille', 'asesoría'],
//   },
//   {
//     name: `Asesoría para Residencia Americana por vínculo familiar directo (cónyuge, hijos menores de 21 años y padres, en caso que el peticionario sea Ciudadano Americano) o Asesoría para Residencia Americana por vínculo familiar directo (para hijos mayores de 21 años o hermanos de Ciudadanos Americanos).`,
//     short_description: `Dirigido a ciudadanos americanos, residentes permanentes o familiares de Ciudadanos Americanos o Residentes de Estados Unidos que desean iniciar trámite de Residencia Americana para familiares directos o inmediatos como cónyuge, hijos menores de 21 años y padres, en caso de que el peticionario sea Ciudadano Americano, hijos mayores de 21 años de Ciudadanos Americanos o Residentes Permanentes de Estados Unidos o Hermanos de Ciudadanos Americanos.`,
//     long_description: `"Dirigido a ciudadanos americanos, residentes permanentes o familiares de Ciudadanos Americanos o Residentes de Estados Unidos que desean iniciar trámite de Residencia Americana para familiares directos o inmediatos como cónyuge, hijos menores de 21 años y padres, en caso de que el peticionario sea Ciudadano Americano.

// En MEXUS Migración, uno de los principales Servicios Migratorios que ofrecemos es la Asesoría completa para el trámite de Residencia Americana o Green Card y cualquier petición ante la dependencia U.S. Citizenship and Immigration Services (USCIS), cuando un Ciudadano Americano o Residente Permanente desea iniciar el trámite de Petición de Green Card para un familiar directo como padres, hijos o cónyuges.

// MEXUS Migración lleva los trámites de Residencia Americana mediante un proceso consular, esto es, cuando el Beneficiario Inmigrante vive en México.

// Existen categorías de familiares directos para quienes la Visa de Inmigrante es inmediata. Por ejemplo, cuando un Ciudadano Americano mayor de 21 años la solicita para su cónyuge, sus hijos menores de 21 años o sus padres. Pero, para otras categorías de familiares, existe un número limitado de Visas al año, que están reguladas por el Centro Nacional de Visas (NVC).

// Por lo anterior, es necesario identificar la categoría del familiar directo, para así obtener un tiempo estimado de la duración del trámite, durante la asesoría brindara la información exacta en referencia al tipo de categoría.

// Categorías que entran como familiar directo en categoría inmediata son: hijos menores de 21 anos de Ciudadanos Americanos, Cónyuge de Ciudadano Americano o Padres de Ciudadanos Americanos.
// Categoría que cuenta como familiar directo de un Residente Permanente, pero no en categoría inmediata son: hijos menores de 21 anos y cónyuges de Residente Permanente.
// Categoría que cuenta como familiar directo, pero NO en categoría inmediata de un Ciudadano Americano son: Hijos mayores de 21 años, hijos casados, hermanos del Ciudadano Americano.
// Categoría que cuenta como familiar directo, pero NO en categoría inmediata de un Residente Permanente: Hijos SOLTEROS mayores de 21 años.

// Es importante recalcar que el contenido de esta sección es únicamente información general, pues cada caso particular es diferente y los pasos requisitos, duración del trámite, etc. varían en cada caso, por ello es importante recibir una asesoría de Residencia Americana por parte del equipo de abogados o asesores de MEXUS Migración.

// "El solicitante deberá vivir fuera de Estados Unidos para que pueda ser una asesoría viable o tenga intenciones de efectuar el proceso de Residencia Americana de manera consular, de lo contrario favor de derivar a una Asesoría de Ajuste de Estatus con la Abogada Americana.
// Si el solicitante llegase a tener cualquier tipo de Antecedente con Estados Unidos o bien, al aplicante le rechazaron su solicitud de Visa de Immigrante en Ciudad Juárez, es necesario programar Asesoría para Perdón Legal o Waiver (ya sea para Visa de Immigrante o Vinculado a un trámite de Residencia Americana).
// Si el solicitante no cuenta con ningún familiar directo señalado en las categorías, MEXUS Migración no podrá brindarle una asesoría para esos fines.Si el solicitante desea programa una cita de asesoría, es necesario enviar el siguiente enlace: https://www.mexusmigracion.com/politicas-de-citas.
// `,
//     requirements: [
//       'Solicitante debe contar con pasaporte vigente.',
//       'Solicitante debe ser familiar directo (padres, hijos) del peticionario.',
//     ],
//     cost: `En caso de que el aplicante pregunte sobre nuestros costos por concepto de honorarios o más información en referencia a pagos del proceso o servicio, favor de enviar el siguiente enlace: https://www.mexusmigracion.com/tabulador-honorarios-mexus. Costo de Asesoria $1,000 pesos mexicanos`,
//     tags: ['residencia', 'familiar', 'americana', 'asesoría'],
//   },
//   {
//     name: `Asesoría para trámite de pasaporte americano`,
//     short_description: `Para ciudadanos estadounidenses por nacimiento, naturalización, derecho de sangre, o niños adoptados internacionalmente por ciudadanos estadounidenses. Requiere documentación que pruebe la ciudadanía americana.`,
//     long_description: `"Para tramitar un pasaporte de Estados Unidos, el cliente debe cumplir con ciertos criterios básicos. Aquí se describe quiénes son elegibles para solicitar un pasaporte estadounidense:

// * Ciudadanos Estadounidenses por Nacimiento: Esto incluye a personas nacidas en los Estados Unidos o en ciertos territorios de EE.UU.
// * Ciudadanos por Naturalización: Las personas que han obtenido la ciudadanía estadounidense a través del proceso de naturalización.
// * Ciudadanos por Derecho de Sangre (Jus Sanguinis): Individuos nacidos en el extranjero que son ciudadanos estadounidenses al nacer a través de uno o ambos padres que son ciudadanos de EE.UU., comúnmente conocido por sus siglas en ingles CRBA (Reporte de Nacimiento de un menor nacido en el extranjero hijo de un Ciudadano Americano)
// * Niños Adoptados Internacionalmente por Ciudadanos Estadounidenses: Los niños que han sido adoptados por ciudadanos estadounidenses pueden ser elegibles para un pasaporte estadounidense, dependiendo de las circunstancias específicas de su adopción y su estatus migratorio.

// Es importante señalar al solicitante que NO solamente con contar con algún documento que pruebe o demuestre la Ciudadanía Americana, el pasaporte americano será autorizado, cada caso es completamente diferente y por ello siempre la recomendación de recibir una asesoría con el equipo de Abogados y Asesores de MEXUS Migración.

// Si el solicitante desea programa una cita de asesoría, es necesario enviar el siguiente enlace: https://www.mexusmigracion.com/politicas-de-citas.`,
//     requirements: [
//       'Solicitante debe poder acreditar su ciudadanía americana con documentación oficial, sea por nacimiento, naturalización, derecho de sangre, o adopción internacional.',
//     ],
//     cost: `En caso de que el aplicante pregunte sobre nuestros costos por concepto de honorarios o más información en referencia a pagos del proceso o servicio, favor de enviar el siguiente enlace: https://www.mexusmigracion.com/tabulador-honorarios-mexus. Costo de Asesoria $1,000 pesos mexicanos.`,
//     tags: ['pasaporte', 'americano', 'asesoría'],
//   },
//   {
//     name: `Asesoria para CRBA o Reporte de Nacimiento para un menor nacido en el Extranjero`,
//     short_description: `Un Reporte Consular de Nacimiento en el Extranjero (CRBA) es un documento que certifica la adquisición de la ciudadanía estadounidense al nacer para una persona nacida en el extranjero de un padre o padres ciudadanos estadounidenses que cumplen con los requisitos para transmitir la ciudadanía. Las solicitudes de CRBA deben hacerse antes de que el niño cumpla 18 años.

// No se puede efectuar la transmisión de una Ciudadanía Americana por parte de un Abuelo Ciudadano Americano, pero para poder confirmar la información SI es necesario programar una cita de asesoría con el equipo de MEXUS Migración.

// En caso de que el solicitante NO reúna todos los requisitos, es posible que se pueda programar una Cita de Asesoría para Residencia Americana.`,
//     long_description: `Un Reporte Consular de Nacimiento en el Extranjero (CRBA) es un documento que certifica la adquisición de la ciudadanía estadounidense al nacer para una persona nacida en el extranjero de un padre o padres ciudadanos estadounidenses que cumplen con los requisitos para transmitir la ciudadanía. Las solicitudes de CRBA deben hacerse antes de que el niño cumpla 18 años.

// Los requisitos más importantes para que un padre o madre pueda transmitir una Ciudadanía Americana son:

// 1. Que el padre o la madre sean Ciudadanos Americanos.
// 2. Que el padre o la madre haya adquirido la Ciudadanía Americana antes del nacimiento del menor.
// 3. Que sea el padre o madre biológico del menor.
// 4. Que el padre o la madre cuente con la presencia física requerida en Estados Unidos previo al nacimiento del menor.
// Reuniendo esos principales requisitos, existe una alta probabilidad de que la transmisión de la Ciudadanía Americana hacia el menor pueda ser viable.

// Estos son algunos factores importantes que el día de su cita de asesoría en MEXUS Migración usted podrá recibir mayores detalles sobre dicha información, ya que cada caso es completamente diferente.

// No se puede efectuar la transmisión de una Ciudadanía Americana por parte de un Abuelo Ciudadano Americano, pero para poder confirmar la información SI es necesario programar una cita de asesoría con el equipo de MEXUS Migración.

// En caso de que el solicitante NO reúna todos los requisitos, es posible que se pueda programar una Cita de Asesoría para Residencia Americana.

// En caso de que el solicitante desee programa una cita de asesoría, es necesario enviar el siguiente enlace: https://www.mexusmigracion.com/politicas-de-citas.`,
//     requirements: [
//       'Que el padre o la madre sean Ciudadanos Americanos.',
//       'Que el padre o la madre haya adquirido la Ciudadanía Americana antes del nacimiento del menor.',
//       'Que sea el padre o madre biológico del menor.',
//       `Que el padre o la madre cuente con la presencia física requerida en Estados Unidos previo al nacimiento del menor.`,
//     ],
//     cost: `En caso de que el aplicante pregunte sobre nuestros costos por concepto de honorarios o más información en referencia a pagos del proceso o servicio, favor de enviar el siguiente enlace: https://www.mexusmigracion.com/tabulador-honorarios-mexus. Costo de Asesoria $1,000 pesos mexicanos.`,
//     tags: ['CRBA', 'reporte de nacimiento', 'asesoría'],
//   },
//   {
//     name: `Asesoría para Doble Nacionalidad (para hijos de padres mexicanos, nacidos en Estados Unidos con intención de buscar la nacionalidad mexicana).`,
//     short_description: `La Doble Nacionalidad es el reconocimiento que se le da a un extranjero como Ciudadano Mexicano.`,
//     long_description: `La Doble Nacionalidad es el reconocimiento que se le da a un extranjero como Ciudadano Mexicano.

// Si el solicitante cuenta con padres de nacionalidad mexicana, es posible verificar mediante una cita de asesoría con el equipo de MEXUS Migración, la viabilidad del proceso o trámite para la obtención de la nacionalidad mexicana al ser hijo de padres Ciudadanos Americanos.
// Si el solicitante cuenta con un acta de nacimiento americana y otra acta de nacimiento mexicana, que diga que nació en México, a eso se le conoce como “doble registro de acta”, por tal motivo si es necesario programar una cita de asesoría.

// Cuando una persona cuenta con dos actas de nacimiento, por ejemplo acta de nacimiento americana que dice que nació en Estados Unidos y acta de nacimiento mexicana que dice que nació en México, se le conoce como “doble registro de acta”, entonces existe un proceso legal que se le denomina como “Juicio de Nulidad”, donde se nulifica el segundo registro de acta, para dicho proceso también se puede programar una cita de asesoría. Si el solicitante desea programa una cita de asesoría, es necesario enviar el siguiente enlace: https://www.mexusmigracion.com/politicas-de-citas.`,
//     requirements: [
//       'El solicitante deberá contar con padres ciudadanos mexicanos por nacimiento o naturalización y es necesario que cuente con su acta de nacimiento en original.',
//     ],
//     cost: `En caso de que el aplicante pregunte sobre nuestros costos por concepto de honorarios o más información en referencia a pagos del proceso o servicio, favor de enviar el siguiente enlace: https://www.mexusmigracion.com/tabulador-honorarios-mexus. Costo de Asesoria $1,000 pesos mexicanos.`,
//     tags: ['doble nacionalidad', 'asesoría'],
//   },
//   {
//     name: `Asesoría para Perdón Legal o Waiver (ya sea para Visa de Immigrante o Vinculado a un trámite de Residencia Americana).`,
//     short_description: `Si el solicitante cuenta con algun antecedente con Estados Unidos como: Deportaciones, Detenciones, vivir de manera ilegal, violar las leyes de migracion de Estados Unidos de cualquier indole, PERO cuentan con algun familiar directo o inmediato de Estados Unidos y desean iniciar o continuar un proceso de Residencia Americana por vinculo familiar.`,
//     long_description: `Si el solicitante cuenta con algun antecedente con Estados Unidos como: Deportaciones, Detenciones, vivir de manera ilegal, violar las leyes de migracion de Estados Unidos de cualquier indole, PERO cuentan con algun familiar directo o inmediato de Estados Unidos y desean iniciar o continuar un proceso de Residencia Americana por vinculo familiar.

// Uno de los requisitos mas importantes para que el aplicante pueda recibir este tipo de asesoria, es que tenga la intencion de iniciar algun tramite vinculado a una visa de IMMIGRANTE o desee iniciar algun proceso de Residencia Americana, pero cuente con antecedentes. Si el solicitante desea programa una cita de asesoría, es necesario enviar el siguiente enlace: https://www.mexusmigracion.com/politicas-de-citas.

// El solicitante debera tener intenciones de obtener una Residencia Americana o Visa de Immigrante por vinculo familiar directo, de lo contrario, se le debera informar al aplicante que requiere una asesoria para perdon legal o waiver vinculado a un proceso o tramite de Visa de Turismo B1/B2.

// Si el solicitante cuenta con familiares directos e inmediatos Ciudadanos Americanos o Residentes y cuenta con antecedentes en Estados Unidos, es indispensable la asesoria con el equipo de MEXUS Migracion parapoder determinar la viabilidad del tramite, posibles fundamentos legales de inadmisibilidad e informar con total transparencia si existen posibilidades para avanzar hacia la Visa de Immigrante o Residencia Americana.`,
//     requirements: [
//       'El solicitante deberá contar con antecedentes con Estados Unidos.',
//       'El solicitante deberá contar con algun familiar directo o inmediato de Estados Unidos.',
//       'El solicitante deberá tener intenciones de obtener una Residencia Americana o Visa de Immigrante por vinculo familiar directo.',
//     ],
//     cost: `En caso de que el aplicante pregunte sobre nuestros costos por concepto de honorarios o más información en referencia a pagos del proceso o servicio, favor de enviar el siguiente enlace: https://www.mexusmigracion.com/tabulador-honorarios-mexus. Costo de Asesoria $1,000 pesos mexicanos.`,
//     tags: [],
//   },
//   {
//     name: `Asesoría para Perdón Legal o Waiver mediante las formas I-212 o I-601.`,
//     short_description: `Si el solicitante ya tuvo una Cita para Entrevista en Ciudad Juarez para la obtencion de la Residencia Americana o Visa de Immigrante y el dia de su entrevista su aplicacion fue denegada mencionandole que requiere el ingreso de las formas I-212 o I-601 ante USCIS.

// Si el solicitante NO aplico o no esta aplicando para una Residencia Americana o Visa de Immigrante, pero asistio a una entrevista consular y el oficial del Consulado Americano le indico que es necesario ingresar la forma I-212, a pesar de ser para una Visa de No-Immigrante, SI se puede programar la asesoria. Unicamente en caso de que el oficial del Consulado Americano NO haya indicado al aplicante el ingreso del formulario I-212 o I-601, es necesario refererir al solicitante a una asesoria para perdon legal o waiver dependiendo si es para una Visa de Immigrante o No-Immigrante.`,
//     long_description: `Si el solicitante ya tuvo una Cita para Entrevista en Ciudad Juarez para la obtencion de la Residencia Americana o Visa de Immigrante y el dia de su entrevista su aplicacion fue denegada mencionandole que requiere el ingreso de las formas I-212 o I-601 ante USCIS.

// Ambos formularios, tanto el I-212 o el I-601 se utilizan para poder curar diferentes fundamentos legales de inadmisibilidad, lo cual, una vez curados los fundamentos legales de las inadmisibilidades mediante dichos formularios, normalmente el solicitante ya puede continuar con su proceso de Visa de Immigrante o Residencia Americana.

// El formulario I-212 normalmente es utilizado cuando una persona ha sido removida o deportada de estados Unidos o ha acumulado cierta presencia ilegal en Estados Unidos y el formulario I-601 es para otro tipo de incidentes en Estados Unidos, por ejemplo: haber tratado de ingresar con documentos falsos a Estados Unidos, haber ayudado a entrar a alguien a Estados Unidos de manera ilegal entre otros.

// Cuando la persona es rechazada en Ciudad Juárez y le es requerido el ingreso de alguno de esos dos formularios o ambos, es indispensable que para que podamos brindar más información al aplicante, programe una cita de asesoría con el equipo de MEXUS Migración, ya que cada caso es completamente diferente, los fundamentos legales pueden ser distintos y los requerimientos a nivel de documentos e información pueden tener grandes variantes.

// Normalmente el formulario I-212 y el I-601 son formularios que se ingresan ante el Departamento de USCIS (United States Citizenship and Immigration Services).

// Si el solicitante NO aplico o no esta aplicando para una Residencia Americana o Visa de Immigrante, pero asistio a una entrevista consular y el oficial del Consulado Americano le indico que es necesario ingresar la forma I-212, a pesar de ser para una Visa de No-Immigrante, SI se puede programar la asesoria. Unicamente en caso de que el oficial del Consulado Americano NO haya indicado al aplicante el ingreso del formulario I-212 o I-601, es necesario refererir al solicitante a una asesoria para perdon legal o waiver dependiendo si es para una Visa de Immigrante o No-Immigrante.

// Si el solicitante desea programa una cita de asesoría, es necesario enviar el siguiente enlace: https://www.mexusmigracion.com/politicas-de-citas.`,
//     requirements: [
//       `El solicitante deberá confirmar que ya asistió a su entrevista consular para la obtención de la Visa de Immigrante o Residencia y le fue denegada por parte del oficial del consulado americano y le entregaron una hoja de rechazo.`,
//     ],
//     cost: `En caso de que el aplicante pregunte sobre nuestros costos por concepto de honorarios o más información en referencia a pagos del proceso o servicio, favor de enviar el siguiente enlace: https://www.mexusmigracion.com/tabulador-honorarios-mexus. Costo de Asesoria $1,000 pesos mexicanos.`,
//     tags: [
//       'perdón legal',
//       'waiver',
//       'asesoría',
//       'forma I-212',
//       'forma I-601',
//       'previa entrevista consular',
//     ],
//   },
//   {
//     name: `Servicio Completo para Trámite de Visa B1/B2`,
//     short_description: `Servicio completo para tramitar la Visa de Turista B1/B2, incluye asesoría, revisión de documentos, llenado de formulario DS-160, programación de cita en el CAS y en la Embajada, y acompañamiento en la entrevista consular. Esta es la opción adecuada cuando el solicitante confirma que desea tramitar la Visa de Turista B1/B2 y no solamente quiere asesoría.`,
//     long_description: `"Si el aplicante desea contratar los Servicios completos para el Tramite de Visa de Turista B1/B2, la cual solo es aplicable para: Algunos ejemplos de las actividades permitidas con una visa de visitante incluyen:
// * Consultar con socios comerciales.
// * Asistir a una convención o conferencia científica, educativa, profesional o de negocios.
// * Liquidar una propiedad
// * Negociar un contrato
// * Turismo
// * Vacaciones
// * Visita con amigos o familiares.
// * Tratamiento médico
// * Participación en eventos sociales organizados por organizaciones fraternales, sociales o de servicios.
// * Participación de aficionados en eventos o concursos musicales, deportivos o similares, si no se les paga por participar.
// * Inscripción en un curso de estudio recreativo corto, que no sea para obtener crédito para obtener un título (por ejemplo, una clase de cocina de dos días durante las vacaciones)

// Estos son algunos ejemplos de actividades que requieren diferentes categorías de visas y no se pueden realizar con una visa de visitante:
// * Estudiar
// * Empleo
// * Actuaciones pagadas o cualquier actuación profesional ante una audiencia de pago.
// * Llegada como tripulante de un barco o avión
// * Trabajar como prensa extranjera, en radio, cine, periodismo impreso u otros medios de información.
// * Residencia permanente en los Estados Unidos

// Tampoco se emitirán visas de visitante para turismo de nacimiento (viajes con el objetivo principal de dar a luz en los Estados Unidos para obtener la ciudadanía estadounidense para su hijo).En MEXUS Migración le brindamos los siguientes servicios:

// Preparación del formulario DS-160. El formulario es llenado de manera presencial y/o vía telefónica directamente con nuestros clientes. Al finalizar dicho formulario, MEXUS Migración declara legalmente que fuimos quienes preparamos este formulario debidamente registrado con las respuestas proporcionadas directamente por parte del solicitante.
// Una vez finalizado el formulario DS-160, en MEXUS Migración nos encargamos de su resguardo, así como de la confirmación del mismo.
// Creamos la cuenta del solicitante ante el Departamento de Visas. Esta cuenta es creada y vinculada con el correo electrónico del solicitante, de tal manera que cualquier cambio o movimiento en dicha cuenta, será el solicitante quien recibirá directamente las indicaciones e instrucciones por parte del Departamento de Visas.
// Generamos la ficha para el pago de la Visa de Turista por $ 185 USD. Dicho pago cuenta con una referencia única y exclusiva de la cuenta del solicitante y va dirigido directamente al Departamento de Visas.
// Una vez sea recibido el pago por parte del Departamento de Visas, nosotros programamos las citas ante el Centro de Atención y Solicitantes para la toma de huellas y fotografías y la cita en la Embajada o Consulado Americano para la entrevista.
// Un día antes de su entrevista, llevamos a cabo una cita en las instalaciones de MEXUS para la revisión y preparación de documentos. Dicha cita NO es para preparar al solicitante antes de su entrevista sobre qué RESPONDER, ya que siempre nuestra mejor preparación es que el solicitante conteste con honestidad todas las preguntas que sean realizadas por parte del oficial. Únicamente se llevara a cabo la revisión de documentos SUGERIDOS y RECOMENDADOS en soporte a la solicitud de la Visa de Turista B1/B2, así como un acomodo adecuado para el día de su entrevista.
// En caso de que la Visa de Turista B1/B2 sea aprobada, nosotros le brindaremos el seguimiento hasta que sea recibido el número de guía por parte de DHL y finalice el proceso.
// El costo de nuestro servicio es de $ 1,500 pesos para trámites de primera vez o renovación para mayores de 15 años y $ 800.00 pesos en caso de ser menores de 15 años y se cumplan con los requerimientos de renovación de Visa de Turista B1/B2 por persona, ya que es llenado un formulario DS-160 por cada solicitante.

// El pago de la Visa de turista B1/B2 por la cantidad de $ 185.00 USD o su equivalente en pesos, deberá ser cubierto por parte del cliente directamente en la sucursal bancaria con el número de referencia proporcionado por parte del Departamento de Visas

// Estos son los pasos para el trámite de Visa de Turista B1/B2, ya sea por primera ocasión, o para renovación:

// El personal de Atención al Cliente de Mexus Migración, le enviará nuestro Cuestionario Interno. Este cuestionario no sustituye al Formulario DS-160, es únicamente para recabar la información necesaria para que el Asesor de Mexus pueda iniciar su trámite.
// Es importante que notifique al Personal de Mexus cuando el cuestionario interno haya sido enviado. Adjunte además copia de su pasaporte mexicano vigente y en caso de aplicar, envíe también copia de su Visa a renovar.
// Le confirmaremos la recepción del cuestionario interno y documentos. La fecha de inicio de su trámite le será confirmada, pero es importante que esté consciente que, las actividades se programan de acuerdo a la disponibilidad del calendario de Mexus Migración y de acuerdo a la carga de trabajo del Asesor que le atenderá durante todo su trámite de Visa de Turista B1/B2.
// En la fecha de inicio de su trámite, la primera acción del Asesor será presentarse con usted, generar el número de confirmación de su Formulario DS-160 y vincular el correo electrónico que usted nos proporcione con la cuenta del Departamento de Visas. Así, su Asesor tendrá acceso a la cuenta, pero también le llegarán directamente a usted todas las notificaciones por parte del Consulado.
// Una vez que el Asesor haya vinculado su cuenta de correo electrónico exitosamente con la página del Departamento de visas, usted recibirá la ficha para el pago del Arancel de su Visa de Turista B1/B2 y recibirá también los datos bancarios y la cantidad para depositar el pago a Mexus Migración por concepto de honorarios del servicio contratado.
// Es importante que avise a su Asesor en Mexus Migración cuando usted haya realizado el pago de ambos conceptos, pues de lo contrario, el Asesor no podrá continuar con su trámite.
// Si una vez programadas sus citas, alguna de estas fuera cancelada, es muy importante que nos lo notifique para reprogramarla. Esta reprogramación podría demorar de 2 a 3 días hábiles por la carga de trabajo. Es necesario aclarar que no es la responsabilidad de Mexus Migración revisar y notificarle en caso que sus citas fueran canceladas, ya que la cancelación estaría llegando directamente a su correo electrónico por parte del Consulado Americano.
// Si tiene dudas al llenar nuestro Cuestionario Interno, podrá dejar campos en blanco y el Asesor de Mexus verificará con usted los faltantes para concluir el formulario DS-160.
// En caso de iniciar su tramite de Visa con Mexus Migración de manera presencial: A) Tendrá un tiempo estimado entre una hora y hora y media. B) El pago por concepto de honorarios se efectuará al término del llenado de Formulario. C) En caso de llegar tarde a su cita en Mexus, es importante avisar en Mexus para poder reprogramarle la misma.
// En Mexus Migración, hemos creado un espacio de preparación antes de la Entrevista en el Consulado, con la finalidad de revisar la documentación y aclarar todas sus dudas. Esto es completamente opcional para todos nuestros clientes.
// La cita para la Entrevista en el Consulado será programada de acuerdo a la disponibilidad que el calendario consular muestre en el momento que sea reflejado el pago del Arancel de su Visa.
// Los servicios de Mexus Migración finalizan cuando quedan programadas sus citas en el Consulado Americano, sin embargo, si su Visa es aprobada le pedimos nos informe para ayudarle al seguimiento de su entrega.
// Cada cliente proporciona la información requerida para tramitar su Visa, en el total entendido que, si oculta o modifica los hechos, será bajo su entera responsabilidad, por lo que le solicitamos sea sumamente honesto en sus respuestas.
// En caso que el Asesor se vea obligado a detener y luego reiniciar el formulario DS-160 por falta de información solicitada con más de 30 días, se cobrará un cargo extra de $500 pesos, puesto que se tiene que iniciar nuevamente.
// Es muy importante no cambiar la contraseña de la cuenta creada por el Asesor, en caso de hacer un cambio de contraseña, notifique a su asesor, con la finalidad de que podamos seguir asistiéndole.
// Nota Importante:

// Los pagos de aranceles dirigidos al Consulado Americano pueden cambiar sin previo aviso.
// La duracion del pago dirigido hacia el departamento de visas es por un año a partir del 01 de octubre del 2022, los cambios de duraciones de pagos y programaciones de citas pueden ser modificados sin previo aviso, ya que cualquier cambio en cuanto al proceso para el tramite de visa de no immigrante, depende diractamente del Consulado y Embajada Americana.
// Estos son los pasos de Mexus Migración para el trámite de Visa americana de Turista y Negocios tipo B1/B2.

// No es posible contratar el Servicio completo para el Trámite de Visa de Turista B1/B2 si el aplicante cuenta con cualquier tipo de antecedente en Estados Unidos, en caso de ser así, favor de referir a la Asesoría de perdón legal o waiver para Visa de No-Immigrante B1/B2.

// Si el solicitante confirma que desea tramitar la Visa de Turista B1/B2, es necesario que conteste el siguiente cuestionario interno: Link del cuestionario interno MEXUS https://forms.gle/A44biBwi29pdeK2b9`,
//     requirements: [
//       'Solicitante debe contar con pasaporte vigente.',
//       'Solicitante no debe tener antecedentes en USA',
//     ],
//     cost: `El costo por concepto de honorarios es de $1,500 pesos mexicanos para mayores de 15 anos de edad y es de $800 pesos mexicanos para menores de 15 anos de edad.

// Es importante aclarar al solicitante que los honorarios NO incluyen los gastos o aranceles del Visado, dicho arancel deberá ser cubierto directamente por parte del aplicante mediante una ficha de pago que su asesor le enviara cuando haya creado su cuenta ante el Departamento de Visas, el costo del Arancel de la Visa es de $185 USD, el equivalente en moneda nacional será reflejado en la ficha del arancel según sea el tipo de cambio. En caso de menores de 15 años existe una cuota reducida de arancel por la cantidad de $15 USD, en su momento su asesor le indicara si es aplicable al menor o no. `,
//     tags: ['servicio completo', 'visa', 'turista'],
//   },
// ];

// await ServiceIndexDAO.Service.insertMany(services);

// await ServiceIndexDAO.ConversationStage.db.close();
/* ------------------------------------------------------------------------------------------------ */
/* ------------------------------------------------------------------------------------------------ */

/* ------------------------------------------------------------------------------------------------ */
/* ------------------------------------------------------------------------------------------------ */
// const { ServiceIndexDAO } = await import(
//   './service-index/db/service-index-dao.js'
// );
// import type { ConversationStageShape } from './service-index/db/schemas/conversation-stage.schema.js';

// const stages: ConversationStageShape[] = [
//   {
//     numeral: `1`,
//     name: `Greeting`,
//     description: `Here we greet the user and ask them how we can help them today. This is the choice every time a chat is new.`,
//     instructions: `Greet the user and ask them how we can help them today.`,
//     requirements: [],
//   },
//   {
//     numeral: `1.1`,
//     name: `General inquiry`,
//     description: `Here we answer general inquiries about our company and our services.`,
//     instructions: `Answer general inquiries about our company and our services.`,
//     requirements: [
//       'User asked open or non-specific questions about our company or services.',
//     ],
//   },
//   {
//     numeral: `2`,
//     name: `Identify need`,
//     description: `Here we identify the user's need and guide them to the appropriate service.`,
//     instructions: `Identify the user's need and guide them to the appropriate service. Ask questions based on the possible services requirements to help you narrow down the user's need.`,
//     requirements: [
//       'This stage must be re-iterated until a single appropiate service is identified.',
//     ],
//   },
//   {
//     numeral: `2.1`,
//     name: `Explain why service is not viable`,
//     description: `Here we explain to the user why the service they are asking for is not viable.`,
//     instructions: `Explain to the user why the service they are asking for is not viable. Offer an alternative service if possible.`,
//     requirements: [
//       'User is asking for specific service but it is explicitly stated that he/she does not fulfill the requirements',
//     ],
//   },
//   {
//     numeral: `2.2`,
//     name: `Provide details of service(s)`,
//     description: `Here we provide details of the service(s) the user is asking for.`,
//     instructions: `Provide details of the service(s) the user is asking for.`,
//     requirements: [
//       'User is asking for specific service and he/she fulfills the requirements. If not, refer to stage 1.1',
//     ],
//   },
//   {
//     numeral: `3`,
//     name: `Service recommendation`,
//     description: `Here we recommend the user the service that best fits their needs.`,
//     instructions: `Recommend the user the service that best fits their needs.`,
//     requirements: [
//       'A single possible service has been identified. If not, refer to stage 2',
//     ],
//   },
//   {
//     numeral: `4`,
//     name: `Appointment support`,
//     description: `Here we provide support to the user to schedule an appointment for the service.`,
//     instructions: `Provide support to the user to schedule an appointment for the service. The link to schedule an appointment is: https://www.mexusmigracion.com/agendacitas`,
//     requirements: [
//       'User has been recommended a service. If not, refer to stage 3',
//       'User has agreed to schedule an appointment. If not, refer to stage 3',
//     ],
//   },
//   {
//     numeral: `5`,
//     name: `Objection handling`,
//     description: `Here we handle any objections the user may have about the service or the attention provided.`,
//     instructions: `Handle any objections the user may have about the service or the attention provided.`,
//     requirements: [
//       'User has expressed an objection about the service or the attention provided.',
//     ],
//   },
//   {
//     numeral: `5.1`,
//     name: `Moderation`,
//     description: `Here we handle cases where the user is being disrespectful or inappropriate, or asking for information or services that are not related to our company.`,
//     instructions: `Handle cases where the user is being disrespectful or inappropriate, or asking for information or services that are not related to our company. Always be respectful and professional, apologize if necessary and ask the user to contact us through our website if they have any other questions.`,
//     requirements: [
//       'User is being disrespectful or inappropriate, or asking for information or services that are not related to our company.',
//     ],
//   },
//   {
//     numeral: `6`,
//     name: `Follow-up`,
//     description: `Here we follow up with the user to make sure we were able to help them.`,
//     instructions: `Follow up with the user to make sure we were able to help them. Ask if they have any other questions or need further assistance.`,
//     requirements: [
//       'User has been recommended a service. If not, refer to stage 3',
//       'User has scheduled an appointment. If not, refer to stage 4',
//       'User has questions or comments about the service or the attention provided.',
//     ],
//   },
//   {
//     numeral: `7`,
//     name: `Goodbye`,
//     description: `Here we say goodbye to the user and thank them for contacting us.`,
//     instructions: `Say goodbye to the user and thank them for contacting us. Make them know they can contact us through our website if they have any other questions, and that you are available to help them.`,
//     requirements: [
//       'User has no more questions or comments.',
//       'User has been helped and expresses gratitude or a goodbye',
//     ],
//   },
// ];

// await ServiceIndexDAO.ConversationStage.insertMany(stages);

// await ServiceIndexDAO.ConversationStage.db.close();
/* ------------------------------------------------------------------------------------------------ */


/* ------------------------------------------------------------------------------------------------ */
// const { ServiceIndexDAO } = await import(
//   './service-index/db/service-index-dao.js'
// );
// import type { KnowledgeShape } from './service-index/db/schemas/knowledge.schema.js';

// const knowledge: KnowledgeShape[] = [
//   {
//     name: `Aviso de Privacidad`,
//     description: `Aviso de Privacidad de MEXUS Migración. Solamente se proporciona a los clientes que lo soliciten.`,
//     content: `AVISO DE PRIVACIDAD

// MEXUS MIGRACION S DE R.L. DE C.V. (en lo sucesivo “EL RESPONSABLE”), con domicilio marcado con el número 785, de la Calle Amado Nervo, ubicada en la Colonia Ladrón de Guevara, Código Postal 44600, de esta Ciudad de Guadalajara, Jalisco, es una empresa legalmente constituida de conformidad con las leyes mexicanas y será “EL RESPONSABLE” del tratamiento de toda la información personal que EL CLIENTE (en lo sucesivo “EL TITULAR”) proporcione, en el entendido que dicha información se considerará en todo momento como estrictamente confidencial y debe ser utilizada para lograr los fines contratados conforme las regulaciones establecidas en la Ley Federal de Protección de Datos Personales en posesión de los Particulares.

// MEXUS manifiesta ser “EL RESPONSABLE” del tratamiento de sus datos personales, financieros y sensibles, con el único fin de utilizarlos de manera personal sin ser divulgados a terceros, por lo que pone a disposición de “EL TITULAR” el presente aviso de privacidad previo la obtención y tratamiento de los mismos, el cual contiene los niveles de seguridad de protección de datos personales legalmente requeridos por la ley.

// DATOS PERSONALES RECABADOS

// “EL RESPONSABLE” se compromete a usar de manera confidencial los datos personales de “EL TITULAR”, y serán utilizados exclusivamente para proporcionar la atención y asesoría correspondiente en asuntos migratorios, así como para emitir la facturación correspondiente y cumplir con las obligaciones legales y fiscales.

// “EL RESPONSABLE” recaba sus datos financieros y sensibles con la finalidad de analizar si Usted es o no sujeto para solicitar una visa de turista, de trabajo, residencia etc.

// La información referida en este apartado podrá ser transmitida a sociedades aseguradoras y legales, sólo en el caso de que “EL TITULAR” no realice los pagos a que se obliga.

// En caso de que no desee que sus datos personales, financieros y sensibles sean utilizados para algunos de estos fines, deberá hacérselo saber a MEXUS de manera inmediata y por escrito en un término no mayor de 3 días naturales de haber contratado los servicios respectivos, de lo contrario se entenderá que autoriza expresamente y consiente el uso de su información para dichos fines.

// Algunos datos personales que pudieran ser solicitados por MEXUS pueden considerarse de carácter sensible en los términos de la Ley Federal de Protección de Datos Personales en Posesión de los Particulares, más su tratamiento es necesario para cumplir las finalidades contratadas, por lo que dicha información será resguardada y sin fines de divulgación a terceros con excepción de lo señalado en el párrafo tercero de este apartado.

// Los datos personales que serán recabados se anuncian en este aviso de privacidad de manera enunciativa más no limitativa:

// Clientes persona física: Nombre completo, comprobante de domicilio (vigencia no mayor de 3 meses), teléfono particular, celular y oficina, correo electrónico, estado civil, fecha de nacimiento, profesión, datos laborales, identificación oficial (IFE, PASAPORTE, CEDULA PROFESIONAL), Registro Federal de Contribuyentes, comprobantes de ingresos, estados de cuenta (3 tres últimos) y referencias comerciales y personales.

// DATOS PERSONALES RECABADOS MEDIANTE LA PÁGINA DE INTERNET

// Al navegar en la página web de MEXUS “EL TITULAR” puede enviarnos algunos datos personales con la finalidad de saber más de nuestros servicios, costos, etc. En tal caso, los datos personales que se estarán solicitando son a saber: nombre completo, correo electrónico y su teléfono.

// El uso de sus datos personales se limitará a atender y responder a su solicitud y/o contactarlo para ofrecerle los servicios exclusivos de MEXUS, observando en todo momento las políticas de protección de datos personales que se desprenden del presente aviso de privacidad.

// DATOS SENSIBLES

// “EL TITULAR” declara que no ha proporcionado y en ningún caso proporcionará a MEXUS datos personales sensibles, es decir, aquellos datos personales íntimos o cuya utilización debida o indebida pueda dar origen a discriminación o conlleve un riesgo grave para éste. En particular, “EL TITULAR” se obliga a no proporcionar a “EL RESPONSABLE” ningún dato relativo a origen racial o étnico, estado de salud presente y futuro, información genética, creencias religiosas, filosóficas y morales, afiliación sindical, opiniones políticas o preferencia sexual.

// FINALIDADES

// El tratamiento que dará “EL RESPONSABLE” a sus datos personales tendrá como finalidad hacer posible el desarrollo integral de la relación particular que “EL TITULAR” ha decidido entablar con nosotros, de acuerdo a las políticas de la compañía y a las disposiciones contractuales y legales aplicables.

// SEGURIDAD DE SUS DATOS PERSONALES

// MEXUS adopta diversas medidas de seguridad para resguardar los datos personales, tales como acceso restringido a las bases de datos, físicas y electrónicas.

// MECANISMOS PARA EJERCER SUS DERECHOS ARCO O PARA REVOCAR EL CONSENTIMIENTO

// En los casos que la ley lo autorice, Usted podrá tener acceso a sus datos, o solicitar su rectificación, oposición o cancelación, o bien, oponerse al tratamiento total o parcial de sus datos y revocar el consentimiento previamente otorgado, de la siguiente manera:

// 1.- Deberá llenar el formato único para acceso a Derechos ARCO y Revocación de Consentimiento, disponible en la siguiente liga: www.mexusmigracion.com/formato_derechos_arco.pdf

// 2.- Una vez llenado el formato único señalado en el numeral anterior inmediato, “EL TITULAR” deberá entregarlo debidamente firmado en el domicilio señalado en el apartado primero de este documento, con los anexos correspondientes.

// Dentro de los plazos que marca la Ley y en dichos términos, “EL RESPONSABLE” le comunicará la respuesta a su solicitud en el término que alude la ley en cuestión.

// En caso de ser necesario, podrá solicitarle que amplíe o aclare la información que haya aportado a través del formato antes señalado, a efecto de estar en posibilidades de atender su solicitud de manera completa.

// CAMBIOS EN LOS AVISOS DE PRIVACIDAD

// Cualquier cambio en este aviso de privacidad o en las finalidades del tratamiento de los datos que usted nos ha proporcionado, le será comunicado por los medios que sean razonables, así como mediante publicación en esta página de Internet y/o en lugares visibles de las instalaciones de MEXUS.`,
//     kind: `legal`,
//     tags: ['privacy', 'legal'],
//   },
//   {
//     name: `Datos Bancarios`,
//     description: `Datos bancarios de MEXUS Migración. Solamente se proporciona a los clientes que lo soliciten.`,
//     content: `Los datos bancarios para pagos a Mexus Migración con pesos mexicanos (MXN) son los siguientes:

// NOMBRE: MEXUS MIGRACION S DE RL DE CV
// BANCO: SANTANDER
// CUENTA: 65 50 68 98 65 6
// CLABE: 014 320 655 068 986 562
// NUMERO DE TARJETA: 5579 0890 0040 7521

// Los datos bancarios para pagos a Mexus Migración con dólares americanos (USD) son los siguientes:

// NOMBRE: MEXUS MIGRACION S DE RL DE CV
// BANCO BENEFICIARION: Banco Santander S.A.
// CUENTA: 8250 1025 956
// CIUDAD Y PAÍS RECEPTOR: Guadalajara, México
// CODIGO SWIFT: BMSXMXMMXXX
// CLABE: 014 320 825 010 259 569`,
//     kind: `payments`,
//     tags: ['bank accounts'],
//   },
//   {
//     name: `Instrucciones para agendar citas`,
//     description: `Documento que contiene el proceso a seguir para agendar una cita. Solamente se proporciona en etapa de soporte para agendar citas.`,
//     content: `A continuación se presentan las instrucciones para agendar una cita de asesoría personalizada en Mexus Migración a través de su sitio web:

// 1. Ingrese al sitio web de Mexus Migración https://www.mexusmigracion.com/agendacitas

// 2. Desplácese hacia abajo hasta la sección "Agende su Cita de Asesoría personalizada".

// 3. En el apartado "Servicio" seleccione la opción correspondiente a la asesoría que necesita.

// 4. En el apartado "Fecha Ideal" seleccione la fecha en la que desea agendar la cita.

// 5. En el apartado "Hora Ideal" seleccione la hora en la que desea agendar la cita. Se mostrarán las horas disponibles para la fecha seleccionada.

// 6. En el apartado "Como prefiere recibir su asesoría" seleccione la opción que prefiera: presencial, telefónica o por videollamada.

// 7. En el apartado "Costo del servicio / Monto a pagar" se mostrará el costo de la asesoría seleccionada.

// 8. Desplácese hacia abajo a la sección de "Por favor ingrese su información de contacto".

// 9. Complete los campos de "Nombre Completo", "Número de WhatsApp" y "Correo Electrónico".

// 10. Acepte los Términos y Condiciones y Políticas de Privacidad de Mexus Migración.

// 11. Haga clic en el botón "Pagar la Cita".

// 12: Tendrá la opción de pagar con tarjeta de crédito o débito, o con PayPal. Siga el proceso de pago según la opción seleccionada.

// 13. Una vez completado el pago, recibirá un correo electrónico de confirmación con los detalles de su cita y será contactado por un asesor de Mexus Migración para coordinar los detalles de la asesoría.

// NOTA IMPORTANTE: En caso de que no pueda realizar el pago en línea, puede comunicarse a través de llamada telefónica al número (33)-2306-9494 para obtener información sobre otras formas de pago como depósito en Oxxo, transferencia bancaria o depósito en ventanilla. Si así lo desea, también puede solicitar los datos bancarios para realizar el pago. Una vez realizado el pago, favor de comunicarse a través de llamada telefónica al número (33)-2306-9494 para confirmar la realización del mismo y coordinar los detalles de la asesoría.

// Referente al punto 3:
// El apartado de "Servicio" que se menciona hay muchas opciones. A continuación se presentan las opciones adecuadas para cada tipo de asesoría (se presenta como ASESORÍA : OPCIÓN):
// * Asesoría para trámite de visas de turista para Estados Unidos (B1/B2) : Asesoría para Visa de Turista B1/B2
// * Asesoría para trámite de visas profesionales para Estados Unidos (tipo H, L y E sólamente) : Asesoría con Abogado Americano para: H-1B, H2-A, L-1A, L-1B, E-1, E-2, Certificaciones Laborales ante DOL (PERM), Form I-140, Ajuste de Status Migratorio.
// * Asesoría para trámite de visas de trabajo para Estados Unidos tipo TN : Asesoría para Visa de Trabajo tipo TN (únicamente si el aplicante cuenta con su Título y Cédula Profesional).
// * Asesoría para trámite de visas de prometido para Estados Unidos (K1/K3) : Asesoría para Visa de Prometido o Fiancé (aplica únicamente si el peticionario es Ciudadano Americano).
// * Asesoría para trámite de visas con atecedentes : Asesoría para Perdón Legal o Waiver mediante las formas I-212 o I-601.
// * Asesoría para solicitud de actas de nacimiento de Estados Unidos : Asesoría para Actas de Nacimiento Americana y Apostille
// * Asesoría para trámite de residencia americana por vínculo familiar : Asesoría para Residencia Americana por vínculo familiar directo (conyuge, hijos menores de 21 años y padres, en caso que el peticionario sea Ciudadano Americano).
// * Asesoría para trámite de pasaporte americano : Asesoría para Trámite de Pasaporte Americano
// * Asesoría para apostille de documentos de Estados Unidos : Asesoría para Actas de Nacimiento Americana y Apostille`,
//     kind: `instructions`,
//     tags: ['appointments', 'scheduling'],
//   },
//   {
//     name: `Oficinas MEXUS Migración`,
//     description: `Documento que contiene las direcciones de las oficinas de MEXUS Migración. Solamente se proporciona a los clientes que lo soliciten.`,
//     content: `Mexus Migración tiene tres oficinas en México, una en Guadalajara, Jalisco, otra en León, Guanajuato y una tercera en Tijuana, Baja California.
// A continuación, se proporcionan las direcciones de nuestras oficinas y un enlace a Google Maps para que pueda ubicarlas fácilmente.
// Cuando un cliente pregunte por las direcciones de nuestras oficinas, se les deben compartir los enlaces de Google Maps para que puedan ubicarlas fácilmente así como la dirección física.

// Oficina Central Guadalajara, Jalisco (citas presenciales)
// Calle Amado Nervo 785
// Colonia Ladrón de Guevara
// Guadalajara, Jalisco, México, CP 44600
// Link de Google Maps: https://maps.app.goo.gl/anHz6fucceYs5esR9

// Oficina Enlace León, Guanajuato (solo citas por videollamada)
// Calle 5 de Febrero 202 B
// Colonia Centro
// León, Guanajuato, México, CP 37000
// Link de Google Maps: https://maps.app.goo.gl/eTUvnLuNGKqQh6iL8

// Oficina Enlace Tijuana, Baja California
// La ubicación de esta oficina se proporciona a clientes que ya han contratado nuestros servicios y así lo requieran.
// Los representantes de servicio al cliente de Mexus Migración no están autorizados a proporcionar la dirección de esta oficina.
// Para clientes que lo necesiten según sea su caso, esta dirección se les proporcionará por el abogado a cargo de su caso.`,
//     kind: `locations`,
//     tags: ['office locations'],
//   },
// ];

// await ServiceIndexDAO.Knowledge.insertMany(knowledge);

// await ServiceIndexDAO.Knowledge.db.close();
/* ------------------------------------------------------------------------------------------------ */


/* ------------------------------------------------------------------------------------------------ */
