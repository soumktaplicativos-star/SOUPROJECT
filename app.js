const statuses = ["Backlog", "Em andamento", "Aguardando", "Concluido"];
const storageKey = "sou-demandas-v1";
const calendarSettingsKey = "sou-calendar-settings-v1";
const accessSettingsKey = "sou-access-settings-v1";

const peopleSeed = [
  { id: "isabela", name: "Isabela", role: "Direcao estrategica e gestao", email: "", color: "#1864ab" },
  { id: "laura", name: "Laura", role: "Operacoes e atendimento", email: "", color: "#0ca678" },
  { id: "yasmin", name: "Yasmin", role: "Trafego pago", email: "", color: "#f08c00" },
  { id: "meriduarda", name: "Meriduarda", role: "Captacao de conteudo", email: "", color: "#c2255c" },
  { id: "clarinha", name: "Clarinha", role: "Financeiro, juridico e formalizacoes", email: "", color: "#7048e8" },
  { id: "comercial", name: "Comercial", role: "Futura contratacao", email: "", color: "#495057" },
  { id: "estrategista", name: "Estrategista", role: "Futura roteirizacao", email: "", color: "#087f5b" },
];

const clientsSeed = [
  {
    id: "clinica-bella",
    name: "Clinica Bella",
    status: "Ativo",
    ownerId: "laura",
    financeStatus: "Regular",
    memberIds: ["isabela", "laura", "yasmin", "meriduarda"],
    services: ["Social media", "Captacao", "Trafego pago"],
    notes: "Cliente aprova tudo pelo WhatsApp.",
  },
  {
    id: "ativa-bpo",
    name: "Ativa BPO",
    status: "Ativo",
    ownerId: "laura",
    financeStatus: "Regular",
    memberIds: ["isabela", "laura", "meriduarda"],
    services: ["Social media", "8 conteudos/mensal", "Captacao 1h30", "Relatorio mensal"],
    notes: "Contrato de gestao de redes sociais. Primeiro mes focado em planejamento, organizacao dos perfis e comunicacao. Modelo sem repasse financeiro direto entre as partes.",
  },
  {
    id: "conceittus-contabilidade",
    name: "Conceittus Contabilidade",
    status: "Ativo",
    ownerId: "laura",
    financeStatus: "Regular",
    memberIds: ["isabela", "laura", "meriduarda"],
    services: ["Social media", "8 conteudos/mensal", "Captacao 1h30", "Relatorio mensal"],
    notes: "Contrato de gestao de redes sociais. Primeiro mes de estruturacao e planejamento. Modelo sem repasse financeiro direto entre as partes.",
  },
  {
    id: "canhestro-odontologia",
    name: "Canhestro Odontologia",
    status: "Ativo",
    ownerId: "laura",
    financeStatus: "Regular",
    memberIds: ["isabela", "laura"],
    services: ["Social media", "7 postagens/mensal", "Conteudo enviado pelo cliente", "Relatorio mensal"],
    notes: "Cliente depende do envio de fotos e videos para continuidade do processo. Inclui estruturacao de perfil, estrategia mensal, edicao, agendamento e direcionamento de comunicacao.",
  },
  {
    id: "espaco-geusa-faria",
    name: "Espaco Geusa Faria",
    status: "Ativo",
    ownerId: "laura",
    financeStatus: "Regular",
    memberIds: ["isabela", "laura", "yasmin", "meriduarda"],
    services: ["Social media", "10 conteudos/mensal", "Captacao 2h", "Trafego a partir do 2 mes"],
    notes: "Pacote robusto com planejamento, edicao, agendamento, relatorio a partir do segundo mes e gestao de trafego pago. Vencimento dia 05.",
  },
  {
    id: "estacao-training",
    name: "Estacao Training",
    status: "Ativo",
    ownerId: "laura",
    financeStatus: "Regular",
    memberIds: ["isabela", "laura", "yasmin", "meriduarda"],
    services: ["Social media", "8 conteudos/mensal", "Captacao 2h", "Trafego a partir do 3 mes"],
    notes: "Primeiro mes de estruturacao. Inclui relatorio a partir do segundo mes e trafego pago a partir do terceiro mes. Vencimento dia 05.",
  },
  {
    id: "fernanda-gandra",
    name: "Fernanda Gandra",
    status: "Ativo",
    ownerId: "laura",
    financeStatus: "Regular",
    memberIds: ["isabela", "laura", "meriduarda"],
    services: ["Social media", "6 posts no 1 mes", "10 posts depois", "Captacao a partir do 3 mes"],
    notes: "Contrato com evolucao de escopo por fase: primeiro mes menor, depois aumento de volume e captacao mobile mensal. Vencimento dia 18.",
  },
  {
    id: "hamburgueria-meio-kilo",
    name: "Hamburgueria Meio Kilo",
    status: "Ativo",
    ownerId: "laura",
    financeStatus: "Regular",
    memberIds: ["isabela", "laura", "yasmin", "meriduarda"],
    services: ["Social media", "8 postagens/mensal", "Captacao 1h30/2h", "Trafego pontual"],
    notes: "Captacao de 1h30 nos dois primeiros meses e depois 2h. Trafego pago pontual nos dois primeiros meses. Vencimento dia 25.",
  },
  {
    id: "jantinha",
    name: "Jantinha",
    status: "Ativo",
    ownerId: "laura",
    financeStatus: "Regular",
    memberIds: ["isabela", "laura", "meriduarda"],
    services: ["Social media", "8 postagens/mensal", "Captacao 1h30", "Relatorio mensal"],
    notes: "Gestao estrategica de Instagram com reestruturacao de perfil, planejamento, edicao, captacao mensal, relatorio e agendamento. Vencimento dia 19.",
  },
  {
    id: "legado-e-luz",
    name: "Legado e Luz",
    status: "Ativo",
    ownerId: "laura",
    financeStatus: "Regular",
    memberIds: ["isabela", "laura", "yasmin", "meriduarda"],
    services: ["Social media", "4 conteudos/mensal", "Captacao 2h", "Trafego a partir do 3 mes"],
    notes: "Pacote enxuto com captacao mensal, roteiro, edicao, artes, legendas, agendamento e relatorio. Trafego pago entra a partir do terceiro mes. Vencimento dia 20.",
  },
  {
    id: "imobiliaria-prado",
    name: "Imobiliaria Prado",
    status: "Ativo",
    ownerId: "meriduarda",
    financeStatus: "Regular",
    memberIds: ["isabela", "meriduarda"],
    services: ["Videomaker mobile", "1 captacao/mensal", "2 videos editados", "Roteirizacao"],
    notes: "Cliente Luiz. Fluxo separado de social media completo: captacao de ate 1h, direcionamento estrategico, roteirizacao e edicao de 2 videos captados. Vencimento dia 05.",
  },
  {
    id: "hora-certa-joias",
    name: "Hora Certa Joias",
    status: "Ativo",
    ownerId: "laura",
    financeStatus: "Regular",
    memberIds: ["isabela", "laura", "yasmin", "meriduarda"],
    services: ["Social media", "10 conteudos/mensal", "2 perfis", "Trafego pago"],
    notes: "Cliente Madu. Alta carga operacional: dois perfis, captacao ate 2h, roteiros, edicao, artes, agendamento, relatorio e gestao de trafego pago. Vencimento dia 10.",
  },
  {
    id: "starnet",
    name: "Starnet",
    status: "Ativo",
    ownerId: "laura",
    financeStatus: "Regular",
    memberIds: ["isabela", "laura", "meriduarda"],
    services: ["Social media", "4 conteudos/mensal", "Captacao 1h", "Relatorio mensal"],
    notes: "Pacote enxuto com planejamento, roteiro, edicao, artes, legendas, agendamento, relatorio e atendimento por WhatsApp. Vencimento dia 25.",
  },
];

const processesSeed = [
  {
    id: "reuniao-mensal",
    title: "Reuniao mensal de alinhamento",
    area: "Estrategia",
    ownerId: "isabela",
    cadence: "Mensal",
    objective: "Entender prioridades do mes seguinte e ajustar a estrategia antes do cronograma ser fechado.",
    checklist: [
      "Conferir relatorio e desempenho do mes anterior",
      "Levantar campanhas, datas comemorativas e produtos prioritarios",
      "Listar pendencias e perguntas estrategicas",
      "Registrar decisoes e proximos passos",
      "Salvar ata na pasta do cliente",
    ],
  },
  {
    id: "analise-desempenho",
    title: "Analise mensal de desempenho",
    area: "Estrategia",
    ownerId: "isabela",
    cadence: "Mensal",
    objective: "Usar dados para orientar o proximo mes e evitar producao de conteudo no escuro.",
    checklist: [
      "Coletar alcance, engajamento, cliques e crescimento",
      "Identificar melhores e piores conteudos",
      "Avaliar formatos, temas e stories com melhor resposta",
      "Incluir dados de trafego pago quando houver",
      "Transformar a analise em decisoes praticas",
    ],
  },
  {
    id: "prioridades-mes",
    title: "Definicao das prioridades do mes",
    area: "Estrategia",
    ownerId: "isabela",
    cadence: "Mensal",
    objective: "Garantir que o cronograma tenha objetivo claro, e nao vire apenas postar por postar.",
    checklist: [
      "Definir objetivo principal e objetivos secundarios",
      "Definir produto ou servico prioritario",
      "Selecionar campanhas e datas comemorativas",
      "Avaliar demandas do cliente",
      "Registrar a estrategia do mes",
    ],
  },
  {
    id: "cronograma-mensal",
    title: "Planejamento do cronograma mensal",
    area: "Conteudo",
    ownerId: "estrategista",
    cadence: "Mensal",
    objective: "Organizar os conteudos do mes com logica estrategica e distribuicao realista para a equipe.",
    checklist: [
      "Definir quantidade de posts conforme contrato",
      "Distribuir formatos por semana",
      "Equilibrar venda, educativo, institucional e prova social",
      "Incluir campanhas e temas da reuniao mensal",
      "Salvar cronograma e atualizar status interno",
    ],
  },
  {
    id: "validacao-cronograma",
    title: "Validacao do cronograma",
    area: "Operacoes",
    ownerId: "laura",
    cadence: "Mensal",
    objective: "Aprovar temas e direcionamentos antes de criar roteiros, legendas, designs e demais materiais.",
    checklist: [
      "Fazer revisao interna dos temas",
      "Enviar cronograma para o cliente",
      "Informar prazo de retorno",
      "Registrar aprovacao ou alteracoes",
      "Atualizar status no controle interno",
    ],
  },
  {
    id: "roteiros-legendas",
    title: "Roteiros, legendas e direcionamentos",
    area: "Conteudo",
    ownerId: "estrategista",
    cadence: "Mensal",
    objective: "Transformar o cronograma em materiais executaveis para gravacao, design, legenda e edicao.",
    checklist: [
      "Criar roteiro com objetivo, fala, direcao visual e CTA",
      "Escrever legendas com tom de voz e hashtags",
      "Definir estrutura de carrosseis e designs",
      "Inserir referencias e observacoes de edicao",
      "Atualizar status de cada conteudo",
    ],
  },
  {
    id: "captacao-mensal",
    title: "Planejamento e captacao mensal",
    area: "Captacao",
    ownerId: "meriduarda",
    cadence: "Mensal",
    objective: "Organizar e gravar todo o material necessario para o ciclo de producao do cliente.",
    checklist: [
      "Separar roteiros por cliente",
      "Confirmar local, horario, pessoas e produtos",
      "Conferir equipamentos, audio, luz e enquadramento",
      "Gravar videos principais, takes de apoio e bastidores",
      "Subir arquivos no Drive e sinalizar pendencias",
    ],
  },
  {
    id: "distribuicao-producao",
    title: "Distribuicao para producao",
    area: "Operacoes",
    ownerId: "laura",
    cadence: "Semanal",
    objective: "Encaminhar cada conteudo para quem vai executar, com responsavel, prazo e material disponivel.",
    checklist: [
      "Separar videos, designs, capas, carrosseis e legendas",
      "Definir responsaveis e prazos",
      "Garantir acesso aos arquivos necessarios",
      "Inserir observacoes estrategicas",
      "Registrar status no controle interno",
    ],
  },
  {
    id: "producao-conteudos",
    title: "Producao dos conteudos",
    area: "Producao",
    ownerId: "laura",
    cadence: "Semanal",
    objective: "Editar, criar e finalizar materiais com qualidade antes da revisao interna.",
    checklist: [
      "Conferir briefing, roteiro e arquivos brutos",
      "Editar video ou criar design conforme identidade visual",
      "Revisar legenda, CTA e informacoes",
      "Exportar e salvar arquivo final",
      "Atualizar status da demanda",
    ],
  },
  {
    id: "revisao-interna",
    title: "Revisao interna",
    area: "Qualidade",
    ownerId: "isabela",
    cadence: "Semanal",
    objective: "Impedir que erro de estrategia, texto, design ou informacao chegue ao cliente.",
    checklist: [
      "Conferir se bate com cronograma, objetivo e briefing",
      "Revisar qualidade visual, audio, headline e CTA",
      "Checar portugues, promessas e informacoes",
      "Confirmar que o arquivo esta salvo corretamente",
      "Liberar para aprovacao do cliente",
    ],
  },
  {
    id: "aprovacao-cliente",
    title: "Aprovacao com cliente",
    area: "Operacoes",
    ownerId: "laura",
    cadence: "Semanal",
    objective: "Enviar conteudos finalizados, controlar retornos e registrar aprovacoes ou ajustes.",
    checklist: [
      "Separar conteudos e link organizado",
      "Enviar mensagem com prazo de aprovacao",
      "Acompanhar retorno do cliente",
      "Registrar aprovacao ou ajuste solicitado",
      "Repassar ajustes com responsavel e prazo",
    ],
  },
  {
    id: "agendamento-mensal",
    title: "Agendamento mensal",
    area: "Operacoes",
    ownerId: "laura",
    cadence: "Mensal",
    objective: "Garantir que publicacoes aprovadas sejam agendadas corretamente.",
    checklist: [
      "Conferir conteudo aprovado, capa e legenda",
      "Conferir data, horario, perfil, localizacao e marcacoes",
      "Agendar postagem",
      "Salvar confirmacao quando necessario",
      "Atualizar status para agendado",
    ],
  },
  {
    id: "acompanhamento",
    title: "Acompanhamento durante o mes",
    area: "Operacoes",
    ownerId: "laura",
    cadence: "Semanal",
    objective: "Monitorar se tudo esta rodando e identificar demandas urgentes ou ajustes de campanha.",
    checklist: [
      "Conferir publicacoes da semana",
      "Verificar comentarios e mensagens relevantes",
      "Observar desempenho inicial",
      "Checar campanhas pagas quando houver",
      "Registrar insights para o relatorio",
    ],
  },
  {
    id: "relatorio-mensal",
    title: "Relatorio mensal",
    area: "Relatorio",
    ownerId: "laura",
    cadence: "Mensal",
    objective: "Mostrar resultado, aprendizados, pontos de atencao e proximos passos ao cliente.",
    checklist: [
      "Coletar dados organicos e pagos",
      "Comparar com o mes anterior",
      "Identificar destaques e oportunidades",
      "Montar e revisar relatorio",
      "Enviar ao cliente e salvar na pasta",
    ],
  },
  {
    id: "trafego-pago",
    title: "Gestao de trafego pago",
    area: "Trafego",
    ownerId: "yasmin",
    cadence: "Semanal",
    objective: "Planejar, executar, monitorar e otimizar campanhas pagas alinhadas aos objetivos comerciais.",
    checklist: [
      "Conferir acessos, conta de anuncios e pagamento",
      "Definir objetivo, publico, verba e criativos",
      "Subir e monitorar campanhas",
      "Ajustar anuncios, publicos e verba",
      "Enviar dados e aprendizados para o relatorio",
    ],
  },
  {
    id: "financeiro-juridico",
    title: "Financeiro, juridico e formalizacoes",
    area: "Administrativo",
    ownerId: "clarinha",
    cadence: "Semanal",
    objective: "Organizar pagamentos, contratos, vencimentos, aditivos, rescisoes e comunicacoes formais.",
    checklist: [
      "Conferir pagamentos e clientes em aberto",
      "Enviar lembretes ou cobrancas quando necessario",
      "Atualizar controle financeiro",
      "Organizar contratos e formalizacoes",
      "Avisar operacao sobre inadimplencias relevantes",
    ],
  },
  {
    id: "onboarding-operacional",
    title: "Onboarding operacional",
    area: "Operacoes",
    ownerId: "laura",
    cadence: "Pontual",
    objective: "Organizar a entrada de novos clientes para que acessos, briefing, grupo e materiais estejam prontos.",
    checklist: [
      "Criar grupo do cliente e enviar boas-vindas",
      "Solicitar e conferir acessos",
      "Organizar materiais iniciais",
      "Conferir formulario e pendencias",
      "Atualizar controle interno do cliente",
    ],
  },
];

const rolesSeed = [
  {
    personId: "isabela",
    title: "Direcao estrategica e gestao",
    objective: "Garantir direcao estrategica, qualidade, organizacao da equipe e crescimento sustentavel.",
    responsibilities: [
      "Gestao geral da agencia e da equipe",
      "Decisoes estrategicas dos clientes",
      "Validacao de planos, campanhas e qualidade",
      "Reunioes estrategicas com clientes",
      "Criacao e melhoria de processos internos",
    ],
  },
  {
    personId: "laura",
    title: "Operacoes e atendimento de clientes",
    objective: "Manter o fluxo operacional organizado, com prazos, aprovacoes, ajustes e agendamentos sob controle.",
    responsibilities: [
      "Onboarding operacional",
      "Controle de aprovacoes e ajustes",
      "Agendamento de postagens",
      "Organizacao de relatorios",
      "Atualizacao dos status das demandas",
    ],
  },
  {
    personId: "yasmin",
    title: "Trafego pago",
    objective: "Garantir campanhas pagas alinhadas aos objetivos comerciais e estrategicos dos clientes.",
    responsibilities: [
      "Conferencia de acessos ao Meta Business",
      "Estruturacao e otimizacao de campanhas",
      "Monitoramento de metricas",
      "Sinalizacao de novos criativos",
      "Envio de dados para relatorio mensal",
    ],
  },
  {
    personId: "meriduarda",
    title: "Captacao de conteudo",
    objective: "Captar videos, fotos, takes de apoio e bastidores seguindo os roteiros definidos.",
    responsibilities: [
      "Conferir roteiros e agenda de gravacao",
      "Gravar conteudos principais e apoios",
      "Garantir qualidade de imagem e audio",
      "Organizar arquivos brutos",
      "Sinalizar pendencias rapidamente",
    ],
  },
  {
    personId: "clarinha",
    title: "Financeiro, juridico e formalizacoes",
    objective: "Controlar pagamentos, contratos, vencimentos e comunicacoes formais com clientes.",
    responsibilities: [
      "Controle financeiro dos clientes",
      "Comunicacao de cobranca",
      "Organizacao de contratos",
      "Aditivos, rescisoes e formalizacoes",
      "Registro de acordos importantes",
    ],
  },
  {
    personId: "comercial",
    title: "Comercial",
    objective: "Atrair, atender, qualificar e conduzir potenciais clientes ate o fechamento.",
    responsibilities: [
      "Prospeccao ativa",
      "Primeiro atendimento e qualificacao",
      "Follow-up e funil comercial",
      "Encaminhamento para proposta",
      "Transicao limpa para onboarding",
    ],
  },
  {
    personId: "estrategista",
    title: "Estrategista de conteudo / Roteirista",
    objective: "Apoiar cronogramas, roteiros, legendas, campanhas e ideias estrategicas.",
    responsibilities: [
      "Criar cronogramas e roteiros",
      "Criar legendas e textos de carrosseis",
      "Adaptar tom de voz por cliente",
      "Organizar direcionamentos de gravacao",
      "Transformar estrategia em conteudo executavel",
    ],
  },
];

const checklistTemplates = {
  onboarding: [
    "Criar grupo do cliente",
    "Enviar mensagem de boas-vindas",
    "Solicitar acessos principais",
    "Conferir login, senha e permissoes",
    "Organizar pasta do cliente",
    "Conferir formulario inicial",
    "Registrar briefing e escopo contratado",
    "Definir responsaveis internos",
    "Agendar proxima reuniao mensal",
  ],
  initial: [
    "Analisar briefing do cliente",
    "Conferir acessos e historico",
    "Criar plano de marketing inicial",
    "Definir linha editorial",
    "Definir primeiros temas do cronograma",
    "Criar roteiros ou direcionamentos iniciais",
    "Enviar primeiros conteudos para aprovacao",
    "Registrar ajustes e aprovacoes",
  ],
  monthly: [
    "Realizar reuniao mensal de alinhamento",
    "Analisar desempenho do mes anterior",
    "Definir prioridades do mes",
    "Planejar cronograma mensal",
    "Validar cronograma internamente",
    "Enviar cronograma para cliente",
    "Criar roteiros, legendas e direcionamentos",
    "Planejar captacao mensal",
    "Distribuir producao para responsaveis",
    "Revisar internamente",
    "Enviar para aprovacao do cliente",
    "Executar ajustes",
    "Agendar publicacoes aprovadas",
    "Montar relatorio mensal",
  ],
  team: [
    "Definir responsavel principal",
    "Definir apoio da equipe",
    "Confirmar prazo interno",
    "Confirmar prazo de entrega ao cliente",
    "Registrar arquivos e links necessarios",
    "Validar etapa anterior antes de executar",
    "Atualizar status no quadro",
    "Sinalizar gargalos ou pendencias",
  ],
};

const cycleDemandTemplates = {
  Onboarding: {
    laura: {
      title: "Onboarding operacional do cliente",
      stage: "Ideia",
      estimatedHours: 2,
      checklistKey: "onboarding",
      description: "Criar grupo, solicitar acessos, organizar materiais iniciais e conferir pendencias.",
    },
    isabela: {
      title: "Diagnostico e estrategia inicial",
      stage: "Em cronograma",
      estimatedHours: 3,
      checklist: [
        "Analisar briefing inicial",
        "Conferir perfil e comunicacao atual",
        "Definir objetivo inicial",
        "Criar direcionamento estrategico",
        "Alinhar prioridades com a equipe",
      ],
      description: "Diagnostico estrategico para orientar o inicio do trabalho.",
    },
    yasmin: {
      title: "Conferir acessos de trafego pago",
      stage: "Aguardando cliente",
      estimatedHours: 1,
      checklist: [
        "Solicitar acesso ao Meta Business",
        "Conferir conta de anuncios",
        "Conferir forma de pagamento",
        "Verificar historico de campanhas",
        "Sinalizar bloqueios ou pendencias",
      ],
      description: "Validar estrutura de trafego pago quando o servico estiver contratado.",
    },
    clarinha: {
      title: "Conferir contrato e situacao financeira",
      stage: "Aguardando cliente",
      estimatedHours: 1,
      checklist: [
        "Conferir contrato assinado",
        "Confirmar vencimento e forma de pagamento",
        "Registrar situacao financeira",
        "Formalizar pendencias, se houver",
      ],
      description: "Validacao juridico/financeira de entrada do cliente.",
    },
  },
  "Demandas iniciais": {
    isabela: {
      title: "Plano inicial de marketing",
      stage: "Em cronograma",
      estimatedHours: 4,
      checklistKey: "initial",
      description: "Criar direcao inicial, linha editorial e primeiras prioridades.",
    },
    estrategista: {
      title: "Primeiros roteiros e legendas",
      stage: "Em roteiro",
      estimatedHours: 3,
      checklist: [
        "Receber direcao estrategica",
        "Criar primeiros roteiros",
        "Criar legendas iniciais",
        "Definir CTAs",
        "Enviar para revisao interna",
      ],
      description: "Transformar a estrategia inicial em conteudos executaveis.",
    },
    laura: {
      title: "Enviar primeiros conteudos para aprovacao",
      stage: "Enviado para aprovacao",
      estimatedHours: 1.5,
      checklistKey: "team",
      description: "Organizar envio, prazo de retorno e controle de aprovacao.",
    },
  },
  "Ciclo mensal": {
    isabela: {
      title: "Reuniao e prioridades do ciclo mensal",
      stage: "Em cronograma",
      estimatedHours: 3,
      checklist: [
        "Realizar reuniao mensal",
        "Analisar desempenho anterior",
        "Definir prioridades do mes",
        "Validar direcao estrategica",
      ],
      description: "Definir a estrategia e prioridades do ciclo mensal.",
    },
    estrategista: {
      title: "Cronograma, roteiros e legendas do mes",
      stage: "Em roteiro",
      estimatedHours: 6,
      checklistKey: "monthly",
      description: "Criar o pacote de conteudo mensal com base na estrategia.",
    },
    meriduarda: {
      title: "Captacao mensal de conteudo",
      stage: "Aguardando gravacao",
      estimatedHours: 4,
      checklist: [
        "Conferir roteiros aprovados",
        "Confirmar data e local",
        "Conferir equipamentos",
        "Captar videos principais",
        "Captar takes de apoio e bastidores",
        "Subir arquivos no Drive",
      ],
      description: "Executar captacao dos materiais do ciclo mensal.",
    },
    laura: {
      title: "Aprovacao, ajustes e agendamento mensal",
      stage: "Enviado para aprovacao",
      estimatedHours: 4,
      checklist: [
        "Distribuir materiais para producao",
        "Enviar conteudos para aprovacao",
        "Registrar ajustes solicitados",
        "Repassar ajustes para responsaveis",
        "Agendar conteudos aprovados",
        "Atualizar status das demandas",
      ],
      description: "Controlar o fluxo operacional do ciclo mensal.",
    },
    yasmin: {
      title: "Planejar e acompanhar campanhas pagas",
      stage: "Em andamento",
      estimatedHours: 3,
      checklist: [
        "Alinhar objetivo comercial",
        "Definir verba e publico",
        "Solicitar criativos necessarios",
        "Monitorar desempenho",
        "Enviar aprendizados para relatorio",
      ],
      description: "Executar e acompanhar trafego pago do ciclo mensal.",
    },
  },
  "Campanha pontual": {
    isabela: {
      title: "Direcao estrategica da campanha",
      stage: "Ideia",
      estimatedHours: 2,
      checklist: ["Definir objetivo", "Definir oferta", "Definir mensagem", "Validar canais e prazos"],
      description: "Definir direcao e escopo da campanha pontual.",
    },
    estrategista: {
      title: "Conteudos da campanha",
      stage: "Em roteiro",
      estimatedHours: 3,
      checklist: ["Criar conceito", "Criar roteiros", "Criar legendas", "Definir CTAs", "Enviar para revisao"],
      description: "Criar materiais de conteudo para a campanha.",
    },
    laura: {
      title: "Controle operacional da campanha",
      stage: "Enviado para aprovacao",
      estimatedHours: 2,
      checklistKey: "team",
      description: "Controlar prazos, aprovacoes, ajustes e agendamento da campanha.",
    },
  },
  "Tráfego pago": {
    yasmin: {
      title: "Campanha de trafego pago",
      stage: "Em andamento",
      estimatedHours: 4,
      checklist: [
        "Definir objetivo da campanha",
        "Conferir acessos",
        "Definir publico e verba",
        "Subir criativos",
        "Monitorar resultados",
        "Otimizar campanha",
      ],
      description: "Criar e otimizar campanha de trafego pago.",
    },
  },
  "Captação": {
    meriduarda: {
      title: "Captacao de conteudo",
      stage: "Aguardando gravacao",
      estimatedHours: 4,
      checklist: [
        "Conferir roteiro",
        "Confirmar local e horario",
        "Conferir equipamentos",
        "Gravar conteudos",
        "Captar apoios",
        "Subir arquivos",
      ],
      description: "Realizar captacao de conteudo do cliente.",
    },
  },
  "Relatório mensal": {
    laura: {
      title: "Organizar relatorio mensal",
      stage: "Relatorio",
      estimatedHours: 2,
      checklist: [
        "Coletar dados organicos",
        "Solicitar dados de trafego, se houver",
        "Montar relatorio",
        "Enviar para revisao",
        "Enviar ao cliente",
      ],
      description: "Preparar e enviar relatorio mensal.",
    },
    yasmin: {
      title: "Dados de trafego para relatorio",
      stage: "Relatorio",
      estimatedHours: 1.5,
      checklist: ["Coletar metricas", "Identificar melhores campanhas", "Apontar aprendizados", "Enviar para relatorio"],
      description: "Separar analise de midia paga para o relatorio mensal.",
    },
  },
};

const seedData = {
  people: peopleSeed,
  clients: clientsSeed,
  demands: [
    {
      id: crypto.randomUUID(),
      title: "Fechar cronograma mensal",
      client: "Clinica Bella",
      clientId: "clinica-bella",
      ownerId: "isabela",
      status: "Em andamento",
      priority: "Alta",
      projectPriority: "Alta",
      flowType: "Ciclo mensal",
      stage: "Em cronograma",
      dueDate: "",
      deliveredDate: "",
      calendarDate: "",
      startTime: "09:00",
      estimatedHours: 3,
      actualHours: 0,
      checklist: checklistTemplates.monthly.slice(0, 6).map((text) => ({ text, done: false })),
      description: "Definir objetivo do mes, temas e prioridades do cliente.",
    },
    {
      id: crypto.randomUUID(),
      title: "Enviar conteudos para aprovacao",
      client: "Clinica Bella",
      clientId: "clinica-bella",
      ownerId: "laura",
      status: "Backlog",
      priority: "Media",
      projectPriority: "Media",
      flowType: "Ciclo mensal",
      stage: "Enviado para aprovacao",
      dueDate: "",
      deliveredDate: "",
      calendarDate: "",
      startTime: "09:00",
      estimatedHours: 1.5,
      actualHours: 0,
      checklist: checklistTemplates.team.slice(0, 5).map((text) => ({ text, done: false })),
      description: "Separar materiais finalizados, enviar link e registrar prazo de retorno.",
    },
    {
      id: crypto.randomUUID(),
      title: "Otimizar campanha Meta Ads",
      client: "Clinica Bella",
      clientId: "clinica-bella",
      ownerId: "yasmin",
      status: "Aguardando",
      priority: "Alta",
      projectPriority: "Alta",
      flowType: "Projeto pontual",
      stage: "Aguardando cliente",
      dueDate: "",
      deliveredDate: "",
      calendarDate: "",
      startTime: "09:00",
      estimatedHours: 2,
      actualHours: 0,
      checklist: checklistTemplates.team.slice(0, 4).map((text) => ({ text, done: false })),
      description: "Aguardando confirmacao de verba para escalar os conjuntos.",
    },
  ],
  processes: processesSeed,
  roles: rolesSeed,
};

let state = loadState();
let calendarSettings = loadCalendarSettings();
let currentAccess = loadAccessSettings();
let selectedPersonId = "todos";
let selectedView = "dashboard";
let draggedDemandId = "";

const elements = {
  personList: document.querySelector("#personList"),
  dashboardGrid: document.querySelector("#dashboardGrid"),
  clientGrid: document.querySelector("#clientGrid"),
  board: document.querySelector("#board"),
  processGrid: document.querySelector("#processGrid"),
  roleGrid: document.querySelector("#roleGrid"),
  metrics: document.querySelector("#metrics"),
  pageHeadline: document.querySelector("#pageHeadline"),
  selectedPersonLabel: document.querySelector("#selectedPersonLabel"),
  workspaceTitle: document.querySelector("#workspaceTitle"),
  statusFilter: document.querySelector("#statusFilter"),
  searchInput: document.querySelector("#searchInput"),
  globalSearchMirror: document.querySelector("#globalSearchMirror"),
  accessRole: document.querySelector("#accessRole"),
  accessProfile: document.querySelector("#accessProfile"),
  accessProfileLabel: document.querySelector("#accessProfileLabel"),
  viewTabs: document.querySelectorAll("[data-view]"),
  generateCycleButton: document.querySelector("#generateCycleButton"),
  addClientButton: document.querySelector("#addClientButton"),
  addDemandButton: document.querySelector("#addDemandButton"),
  addProcessButton: document.querySelector("#addProcessButton"),
  addPersonButton: document.querySelector("#addPersonButton"),
  calendarSettingsButton: document.querySelector("#calendarSettingsButton"),
  syncCalendarButton: document.querySelector("#syncCalendarButton"),
  exportButton: document.querySelector("#exportButton"),
  exportCalendarButton: document.querySelector("#exportCalendarButton"),
  importFile: document.querySelector("#importFile"),
  personDialog: document.querySelector("#personDialog"),
  personForm: document.querySelector("#personForm"),
  personDialogTitle: document.querySelector("#personDialogTitle"),
  personId: document.querySelector("#personId"),
  personName: document.querySelector("#personName"),
  personRole: document.querySelector("#personRole"),
  personEmail: document.querySelector("#personEmail"),
  personColor: document.querySelector("#personColor"),
  deletePersonButton: document.querySelector("#deletePersonButton"),
  demandDialog: document.querySelector("#demandDialog"),
  demandForm: document.querySelector("#demandForm"),
  demandDialogTitle: document.querySelector("#demandDialogTitle"),
  demandId: document.querySelector("#demandId"),
  demandTitle: document.querySelector("#demandTitle"),
  demandClient: document.querySelector("#demandClient"),
  demandOwner: document.querySelector("#demandOwner"),
  demandStatus: document.querySelector("#demandStatus"),
  demandPriority: document.querySelector("#demandPriority"),
  demandProjectPriority: document.querySelector("#demandProjectPriority"),
  demandFlowType: document.querySelector("#demandFlowType"),
  demandStage: document.querySelector("#demandStage"),
  demandDueDate: document.querySelector("#demandDueDate"),
  demandDeliveredDate: document.querySelector("#demandDeliveredDate"),
  demandCalendarDate: document.querySelector("#demandCalendarDate"),
  demandStartTime: document.querySelector("#demandStartTime"),
  demandEstimatedHours: document.querySelector("#demandEstimatedHours"),
  demandActualHours: document.querySelector("#demandActualHours"),
  demandDescription: document.querySelector("#demandDescription"),
  demandChecklist: document.querySelector("#demandChecklist"),
  deleteDemandButton: document.querySelector("#deleteDemandButton"),
  processDialog: document.querySelector("#processDialog"),
  processForm: document.querySelector("#processForm"),
  processDialogTitle: document.querySelector("#processDialogTitle"),
  processId: document.querySelector("#processId"),
  processTitle: document.querySelector("#processTitle"),
  processArea: document.querySelector("#processArea"),
  processOwner: document.querySelector("#processOwner"),
  processCadence: document.querySelector("#processCadence"),
  processObjective: document.querySelector("#processObjective"),
  processChecklist: document.querySelector("#processChecklist"),
  deleteProcessButton: document.querySelector("#deleteProcessButton"),
  roleDialog: document.querySelector("#roleDialog"),
  roleForm: document.querySelector("#roleForm"),
  roleDialogTitle: document.querySelector("#roleDialogTitle"),
  rolePersonId: document.querySelector("#rolePersonId"),
  rolePersonSelect: document.querySelector("#rolePersonSelect"),
  roleTitle: document.querySelector("#roleTitle"),
  roleObjective: document.querySelector("#roleObjective"),
  roleResponsibilities: document.querySelector("#roleResponsibilities"),
  editRolePersonButton: document.querySelector("#editRolePersonButton"),
  calendarDialog: document.querySelector("#calendarDialog"),
  calendarForm: document.querySelector("#calendarForm"),
  calendarWebhookUrl: document.querySelector("#calendarWebhookUrl"),
  calendarAutoSync: document.querySelector("#calendarAutoSync"),
  testCalendarSyncButton: document.querySelector("#testCalendarSyncButton"),
  clientDialog: document.querySelector("#clientDialog"),
  clientForm: document.querySelector("#clientForm"),
  clientDialogTitle: document.querySelector("#clientDialogTitle"),
  clientId: document.querySelector("#clientId"),
  clientName: document.querySelector("#clientName"),
  clientStatus: document.querySelector("#clientStatus"),
  clientOwner: document.querySelector("#clientOwner"),
  clientFinanceStatus: document.querySelector("#clientFinanceStatus"),
  clientServices: document.querySelector("#clientServices"),
  clientNotes: document.querySelector("#clientNotes"),
  clientProjectPeople: document.querySelector("#clientProjectPeople"),
  clientDemandList: document.querySelector("#clientDemandList"),
  addClientDemandButton: document.querySelector("#addClientDemandButton"),
  deleteClientButton: document.querySelector("#deleteClientButton"),
  cycleDialog: document.querySelector("#cycleDialog"),
  cycleForm: document.querySelector("#cycleForm"),
  cycleClient: document.querySelector("#cycleClient"),
  cycleType: document.querySelector("#cycleType"),
  cycleProjectPriority: document.querySelector("#cycleProjectPriority"),
  cycleDueDate: document.querySelector("#cycleDueDate"),
  cyclePeople: document.querySelector("#cyclePeople"),
  cycleNotes: document.querySelector("#cycleNotes"),
};

function loadState() {
  const saved = localStorage.getItem(storageKey);
  if (!saved) return structuredClone(seedData);

  try {
    const parsed = JSON.parse(saved);
    if (!Array.isArray(parsed.people) || !Array.isArray(parsed.demands)) return structuredClone(seedData);

    return applySeedMigrations({
      people: parsed.people.length ? parsed.people.map(normalizePerson) : peopleSeed,
      clients: Array.isArray(parsed.clients) ? parsed.clients.map(normalizeClient) : clientsSeed,
      demands: parsed.demands.map(normalizeDemand),
      processes: Array.isArray(parsed.processes) ? parsed.processes : processesSeed,
      roles: Array.isArray(parsed.roles) ? parsed.roles : rolesSeed,
    });
  } catch {
    return structuredClone(seedData);
  }
}

function applySeedMigrations(currentState) {
  const existingClientIds = new Set(currentState.clients.map((client) => client.id));
  const missingClients = clientsSeed
    .filter((client) => !existingClientIds.has(client.id))
    .map((client) => structuredClone(client));

  return {
    ...currentState,
    clients: [...currentState.clients, ...missingClients],
  };
}

function saveState() {
  localStorage.setItem(storageKey, JSON.stringify(state));
}

function loadCalendarSettings() {
  try {
    const saved = JSON.parse(localStorage.getItem(calendarSettingsKey) || "{}");
    return {
      webhookUrl: saved.webhookUrl || "",
      autoSync: Boolean(saved.autoSync),
    };
  } catch {
    return { webhookUrl: "", autoSync: false };
  }
}

function saveCalendarSettings() {
  localStorage.setItem(calendarSettingsKey, JSON.stringify(calendarSettings));
}

function loadAccessSettings() {
  try {
    const saved = JSON.parse(localStorage.getItem(accessSettingsKey) || "{}");
    return {
      role: ["admin", "collaborator", "client"].includes(saved.role) ? saved.role : "admin",
      profileId: saved.profileId || "",
    };
  } catch {
    return { role: "admin", profileId: "" };
  }
}

function saveAccessSettings() {
  localStorage.setItem(accessSettingsKey, JSON.stringify(currentAccess));
}

function normalizePerson(person) {
  return {
    ...person,
    email: person.email || "",
  };
}

function normalizeClient(client) {
  const services = Array.isArray(client.services) ? client.services : String(client.services || "").split("\n").filter(Boolean);
  return {
    id: client.id || crypto.randomUUID(),
    name: client.name || "Cliente sem nome",
    status: client.status || "Ativo",
    ownerId: client.ownerId || peopleSeed[0].id,
    financeStatus: client.financeStatus || "Regular",
    memberIds: normalizeClientMemberIds(client.memberIds, client.ownerId, services),
    services,
    notes: client.notes || "",
  };
}

function normalizeClientMemberIds(memberIds, ownerId, services = []) {
  const ids = Array.isArray(memberIds) ? memberIds.filter(Boolean) : [];
  const owner = ownerId || peopleSeed[0].id;
  const serviceText = services.join(" ").toLowerCase();

  if (!ids.length) ids.push(owner);
  if (/social|conteudo|post|relatorio/.test(serviceText)) ids.push("isabela", "laura");
  if (/captacao|video|videomaker|reels/.test(serviceText)) ids.push("meriduarda");
  if (/trafego|ads|campanha/.test(serviceText)) ids.push("yasmin");

  return [...new Set(ids)];
}

function normalizeDemand(demand) {
  return {
    ...demand,
    clientId: demand.clientId || findClientIdByName(demand.client),
    client: demand.client || getClient(demand.clientId)?.name || "",
    projectPriority: demand.projectPriority || demand.priority || "Media",
    flowType: demand.flowType || "Ciclo mensal",
    calendarDate: demand.calendarDate || "",
    startTime: demand.startTime || "09:00",
    checklist: normalizeChecklist(demand.checklist),
  };
}

function normalizeChecklist(checklist = []) {
  if (!Array.isArray(checklist)) return [];
  return checklist
    .map((item) => {
      if (typeof item === "string") {
        const done = /^\s*\[(x|X)\]\s*/.test(item);
        return { text: item.replace(/^\s*\[( |x|X)\]\s*/, "").trim(), done };
      }
      return { text: String(item.text || "").trim(), done: Boolean(item.done) };
    })
    .filter((item) => item.text);
}

function getOwner(ownerId) {
  return state.people.find((person) => person.id === ownerId);
}

function getClient(clientId) {
  return state.clients?.find((client) => client.id === clientId);
}

function getClientMembers(client) {
  return (client?.memberIds || [])
    .map((personId) => getOwner(personId))
    .filter(Boolean);
}

function findClientIdByName(name = "") {
  return state?.clients?.find((client) => client.name.toLowerCase() === String(name).toLowerCase())?.id || "";
}

function isAdminAccess() {
  return currentAccess.role === "admin";
}

function isCollaboratorAccess() {
  return currentAccess.role === "collaborator";
}

function isClientAccess() {
  return currentAccess.role === "client";
}

function getAccessClientIds() {
  if (!isClientAccess()) return state.clients.map((client) => client.id);
  return currentAccess.profileId ? [currentAccess.profileId] : [];
}

function demandAllowedByAccess(demand) {
  if (isClientAccess()) return getAccessClientIds().includes(demand.clientId);
  if (isCollaboratorAccess()) return demand.ownerId === currentAccess.profileId;
  return true;
}

function clientAllowedByAccess(client) {
  if (isClientAccess()) return client.id === currentAccess.profileId;
  if (isCollaboratorAccess()) return client.ownerId === currentAccess.profileId || client.memberIds?.includes(currentAccess.profileId);
  return true;
}

function processAllowedByAccess(process) {
  if (isClientAccess()) return false;
  if (isCollaboratorAccess()) return process.ownerId === currentAccess.profileId;
  return true;
}

function roleAllowedByAccess(role) {
  if (isClientAccess()) return false;
  if (isCollaboratorAccess()) return role.personId === currentAccess.profileId;
  return true;
}

function getVisibleDemands() {
  const status = elements.statusFilter.value;
  const search = elements.searchInput.value.trim().toLowerCase();

  return state.demands.filter((demand) => {
    const owner = getOwner(demand.ownerId);
    const client = getClient(demand.clientId);
    const personMatch = isClientAccess() || isCollaboratorAccess() || selectedPersonId === "todos" || demand.ownerId === selectedPersonId;
    const statusMatch = status === "todos" || demand.status === status;
    const searchText = [
      demand.title,
      client?.name || demand.client,
      owner?.name,
      demand.stage,
      demand.flowType,
      demand.projectPriority,
      demand.description,
      ...normalizeChecklist(demand.checklist).map((item) => item.text),
    ]
      .join(" ")
      .toLowerCase();

    return demandAllowedByAccess(demand) && personMatch && statusMatch && searchText.includes(search);
  });
}

function getVisibleProcesses() {
  const search = elements.searchInput.value.trim().toLowerCase();

  return state.processes.filter((process) => {
    const owner = getOwner(process.ownerId);
    const personMatch = isCollaboratorAccess() || selectedPersonId === "todos" || process.ownerId === selectedPersonId;
    const searchText = [
      process.title,
      process.area,
      process.cadence,
      process.objective,
      owner?.name,
      ...(process.checklist || []),
    ]
      .join(" ")
      .toLowerCase();

    return processAllowedByAccess(process) && personMatch && searchText.includes(search);
  });
}

function getVisibleRoles() {
  return state.roles.filter(
    (role) => roleAllowedByAccess(role) && (isCollaboratorAccess() || selectedPersonId === "todos" || role.personId === selectedPersonId),
  );
}

function getVisibleClients() {
  const search = elements.searchInput.value.trim().toLowerCase();

  return state.clients.filter((client) => {
    const owner = getOwner(client.ownerId);
    const members = getClientMembers(client);
    const personMatch =
      isClientAccess() || isCollaboratorAccess() || selectedPersonId === "todos" || client.ownerId === selectedPersonId;
    const searchText = [
      client.name,
      client.status,
      client.financeStatus,
      owner?.name,
      client.notes,
      ...(client.services || []),
      ...members.map((person) => person.name),
    ]
      .join(" ")
      .toLowerCase();

    return clientAllowedByAccess(client) && (personMatch || members.some((person) => person.id === selectedPersonId)) && searchText.includes(search);
  });
}

function render() {
  ensureAccessState();
  renderAccessControls();
  renderPeople();
  renderOwnerOptions();
  renderHeader();
  renderMetrics();
  renderMainView();
  saveState();
}

function ensureAccessState() {
  if (isCollaboratorAccess() && !state.people.some((person) => person.id === currentAccess.profileId)) {
    currentAccess.profileId = state.people[0]?.id || "";
  }

  if (isClientAccess() && !state.clients.some((client) => client.id === currentAccess.profileId)) {
    currentAccess.profileId = state.clients[0]?.id || "";
  }

  if (isCollaboratorAccess()) selectedPersonId = currentAccess.profileId || "todos";
  if (isClientAccess()) {
    selectedPersonId = "todos";
    if (!["dashboard", "clients", "demands"].includes(selectedView)) selectedView = "dashboard";
  }

  saveAccessSettings();
}

function renderAccessControls() {
  elements.accessRole.value = currentAccess.role;
  const profiles = isClientAccess() ? state.clients : isCollaboratorAccess() ? state.people : [];

  elements.accessProfileLabel.hidden = isAdminAccess();
  elements.accessProfile.innerHTML = profiles
    .map((profile) => `<option value="${profile.id}">${escapeHtml(profile.name)}</option>`)
    .join("");
  elements.accessProfile.value = currentAccess.profileId || profiles[0]?.id || "";
}

function renderPeople() {
  if (isClientAccess()) {
    const client = getClient(currentAccess.profileId);
    const members = getClientMembers(client);
    elements.personList.innerHTML = members.length
      ? members.map((person) => personButtonTemplate(person, state.demands.filter((demand) => demand.ownerId === person.id && demand.clientId === client?.id).length)).join("")
      : `<div class="empty-state compact">Equipe nao definida</div>`;
    return;
  }

  const allCount =
    selectedView === "processes" ? state.processes.length : selectedView === "clients" ? state.clients.length : state.demands.length;
  const rows = [
    personButtonTemplate({ id: "todos", name: "Toda a equipe", role: "Visao geral", color: "#202124" }, allCount),
    ...state.people.map((person) => {
      const count =
        selectedView === "processes"
          ? state.processes.filter((process) => process.ownerId === person.id).length
          : selectedView === "clients"
            ? state.clients.filter((client) => client.ownerId === person.id || client.memberIds?.includes(person.id)).length
          : state.demands.filter((demand) => demand.ownerId === person.id).length;
      return personButtonTemplate(person, count);
    }),
  ];

  elements.personList.innerHTML = rows.join("");

  elements.personList.querySelectorAll(".person-row").forEach((button) => {
    button.addEventListener("click", () => {
      selectedPersonId = button.dataset.id;
      render();
    });

    button.addEventListener("dblclick", () => {
      if (button.dataset.id !== "todos") openPersonDialog(button.dataset.id);
    });
  });
}

function personButtonTemplate(person, count) {
  const active = selectedPersonId === person.id ? " active" : "";
  return `
    <button class="person-row${active}" type="button" data-id="${person.id}">
      <span class="person-dot" style="background:${person.color}"></span>
      <span>
        <span class="person-name">${escapeHtml(person.name)}</span>
        <span class="person-role">${escapeHtml(person.role)}</span>
      </span>
      <span class="person-count">${count}</span>
    </button>
  `;
}

function renderOwnerOptions() {
  const options = state.people.map((person) => `<option value="${person.id}">${escapeHtml(person.name)}</option>`).join("");
  const clientOptions = state.clients
    .map((client) => `<option value="${client.id}">${escapeHtml(client.name)}</option>`)
    .join("");
  elements.demandOwner.innerHTML = options;
  elements.processOwner.innerHTML = options;
  elements.rolePersonSelect.innerHTML = options;
  elements.clientOwner.innerHTML = options;
  elements.demandClient.innerHTML = clientOptions;
  elements.cycleClient.innerHTML = clientOptions;
}

function renderHeader() {
  const person = selectedPersonId === "todos" ? null : getOwner(selectedPersonId);
  const accessClient = isClientAccess() ? getClient(currentAccess.profileId) : null;
  const viewLabels = {
    dashboard: accessClient ? "Portal do cliente" : person ? "Resumo do colaborador" : "Visao geral da operacao",
    clients: accessClient ? "Projeto do cliente" : person ? "Clientes do colaborador" : "Carteira de clientes",
    demands: accessClient ? "Demandas do projeto" : person ? "Demandas do colaborador" : "Todas as demandas",
    processes: person ? "Processos do colaborador" : "Processos da agencia",
    roles: person ? "Funcao do colaborador" : "Funcoes da equipe",
  };
  const viewTitles = {
    dashboard: accessClient ? accessClient.name : person ? person.name : "Painel executivo",
    clients: accessClient ? accessClient.name : person ? person.name : "Clientes",
    demands: accessClient ? accessClient.name : person ? person.name : "Painel da equipe",
    processes: person ? person.name : "Processos internos",
    roles: person ? person.name : "Responsabilidades",
  };
  const pageTitles = {
    dashboard: "Dashboard",
    clients: "Clientes",
    demands: "Demandas",
    processes: "Processos",
    roles: "Funcoes",
  };

  elements.pageHeadline.textContent = pageTitles[selectedView];
  elements.selectedPersonLabel.textContent = viewLabels[selectedView];
  elements.workspaceTitle.textContent = viewTitles[selectedView];
  elements.addClientButton.hidden = selectedView !== "clients";
  elements.addDemandButton.hidden = selectedView !== "demands";
  elements.addProcessButton.hidden = selectedView !== "processes";
  elements.generateCycleButton.hidden = !isAdminAccess();
  elements.addClientButton.hidden = elements.addClientButton.hidden || !isAdminAccess();
  elements.addDemandButton.hidden = elements.addDemandButton.hidden || isClientAccess();
  elements.addProcessButton.hidden = elements.addProcessButton.hidden || !isAdminAccess();
  elements.addPersonButton.hidden = !isAdminAccess();
  elements.calendarSettingsButton.hidden = !isAdminAccess();
  elements.syncCalendarButton.hidden = !isAdminAccess();
  elements.exportCalendarButton.hidden = isClientAccess();
  elements.exportButton.hidden = isClientAccess();
  elements.importFile.previousElementSibling.hidden = !isAdminAccess();

  elements.viewTabs.forEach((tab) => {
    tab.hidden = isClientAccess() && ["processes", "roles"].includes(tab.dataset.view);
    tab.classList.toggle("active", tab.dataset.view === selectedView);
  });
}

function renderMetrics() {
  if (selectedView === "dashboard") {
    const visible = getVisibleDemands();
    const estimated = sumHours(visible, "estimatedHours");
    const actual = sumHours(visible, "actualHours");
    const done = visible.filter((demand) => demand.status === "Concluido").length;
    const productivity = estimated ? Math.round((actual / estimated) * 100) : 0;
    renderMetricItems([
      ["Demandas ativas", visible.filter((demand) => demand.status !== "Concluido").length],
      ["Concluidas", done],
      ["Uso do tempo", `${productivity}%`],
      ["Atrasadas", visible.filter((demand) => isOverdue(demand)).length],
    ]);
    return;
  }

  if (selectedView === "clients") {
    const visible = getVisibleClients();
    renderMetricItems([
      ["Clientes", visible.length],
      ["Ativos", visible.filter((client) => client.status === "Ativo").length],
      ["Inativos", visible.filter((client) => client.status !== "Ativo").length],
      ["Pendencias", visible.filter((client) => client.financeStatus !== "Regular").length],
    ]);
    return;
  }

  if (selectedView === "demands") {
    const visible = getVisibleDemands();
    const estimated = sumHours(visible, "estimatedHours");
    const actual = sumHours(visible, "actualHours");
    renderMetricItems([
      ["Demandas", visible.length],
      ["Em andamento", visible.filter((demand) => demand.status === "Em andamento").length],
      ["Horas prev.", formatHours(estimated)],
      ["Saldo h", formatHours(estimated - actual)],
    ]);
    return;
  }

  if (selectedView === "processes") {
    const visible = getVisibleProcesses();
    renderMetricItems([
      ["Processos", visible.length],
      ["Mensais", visible.filter((process) => process.cadence === "Mensal").length],
      ["Semanais", visible.filter((process) => process.cadence === "Semanal").length],
      ["Areas", new Set(visible.map((process) => process.area)).size],
    ]);
    return;
  }

  const visibleRoles = getVisibleRoles();
  renderMetricItems([
    ["Funcoes", visibleRoles.length],
    ["Atuais", visibleRoles.filter((role) => !["comercial", "estrategista"].includes(role.personId)).length],
    ["Futuras", visibleRoles.filter((role) => ["comercial", "estrategista"].includes(role.personId)).length],
    ["Pessoas", selectedPersonId === "todos" ? state.people.length : 1],
  ]);
}

function renderMetricItems(metricItems) {
  elements.metrics.innerHTML = metricItems
    .map(([label, value]) => `<article class="metric"><span>${label}</span><strong>${value}</strong></article>`)
    .join("");
}

function renderMainView() {
  elements.dashboardGrid.hidden = selectedView !== "dashboard";
  elements.clientGrid.hidden = selectedView !== "clients";
  elements.board.hidden = selectedView !== "demands";
  elements.processGrid.hidden = selectedView !== "processes";
  elements.roleGrid.hidden = selectedView !== "roles";

  if (selectedView === "dashboard") renderDashboard();
  if (selectedView === "clients") renderClients();
  if (selectedView === "demands") renderBoard();
  if (selectedView === "processes") renderProcesses();
  if (selectedView === "roles") renderRoles();
}

function renderDashboard() {
  const demands = getVisibleDemands();
  const activeDemands = demands.filter((demand) => demand.status !== "Concluido");
  const upcoming = [...activeDemands]
    .filter((demand) => demand.dueDate)
    .sort((a, b) => new Date(`${a.dueDate}T00:00:00`) - new Date(`${b.dueDate}T00:00:00`))
    .slice(0, 5);
  const workload = state.people
    .map((person) => {
      const personDemands = demands.filter((demand) => demand.ownerId === person.id && demand.status !== "Concluido");
      return {
        person,
        count: personDemands.length,
        hours: sumHours(personDemands, "estimatedHours"),
      };
    })
    .filter((item) => item.count || selectedPersonId !== "todos")
    .sort((a, b) => b.count - a.count);
  const maxWorkload = Math.max(1, ...workload.map((item) => item.count));
  const stageCounts = countBy(activeDemands, "stage");
  const statusCounts = countBy(demands, "status");

  elements.dashboardGrid.innerHTML = `
    <article class="dashboard-panel wide-panel">
      <h3>Saude da operacao</h3>
      <div class="stage-cloud">
        ${statuses
          .map((status) => `<span class="tag">${escapeHtml(status)}: ${statusCounts[status] || 0}</span>`)
          .join("")}
      </div>
    </article>

    <article class="dashboard-panel">
      <h3>Carga por colaborador</h3>
      <div class="workload-list">
        ${
          workload.length
            ? workload.map((item) => workloadRowTemplate(item, maxWorkload)).join("")
            : `<p>Nenhuma demanda ativa no filtro atual.</p>`
        }
      </div>
    </article>

    <article class="dashboard-panel">
      <h3>Proximas entregas</h3>
      <div class="deadline-list">
        ${
          upcoming.length
            ? upcoming.map(deadlineCardTemplate).join("")
            : `<p>Nenhuma entrega com prazo definido.</p>`
        }
      </div>
    </article>

    <article class="dashboard-panel wide-panel">
      <h3>Etapas com trabalho em andamento</h3>
      <div class="insight-list">
        ${
          Object.keys(stageCounts).length
            ? Object.entries(stageCounts)
                .sort((a, b) => b[1] - a[1])
                .map(([stage, count]) => `<div class="insight-card"><strong>${escapeHtml(stage || "Sem etapa")}</strong><p>${count} demanda${count === 1 ? "" : "s"} nessa etapa.</p></div>`)
                .join("")
            : `<p>Sem demandas ativas para analisar.</p>`
        }
      </div>
    </article>
  `;
}

function workloadRowTemplate(item, maxWorkload) {
  const width = Math.max(8, Math.round((item.count / maxWorkload) * 100));
  return `
    <div class="workload-row">
      <span class="owner-pill">
        <span class="owner-avatar" style="background:${item.person.color}">${getInitials(item.person.name)}</span>
        ${escapeHtml(item.person.name)}
      </span>
      <span class="progress-track"><span class="progress-fill" style="width:${width}%"></span></span>
      <span class="tag">${item.count} tarefas / ${formatHours(item.hours)}h</span>
    </div>
  `;
}

function deadlineCardTemplate(demand) {
  const owner = getOwner(demand.ownerId);
  const client = getClient(demand.clientId);
  const late = isOverdue(demand) ? " high" : "";
  return `
    <div class="deadline-card">
      <strong>${escapeHtml(demand.title)}</strong>
      <p>${escapeHtml(client?.name || demand.client)} - ${escapeHtml(owner?.name || "Sem responsavel")}</p>
      <span class="tag${late}">${formatDate(demand.dueDate)}</span>
    </div>
  `;
}

function renderClients() {
  const visible = getVisibleClients();
  elements.clientGrid.innerHTML = visible.length
    ? visible.map(clientCardTemplate).join("")
    : `<div class="empty-state">Nenhum cliente encontrado</div>`;

  elements.clientGrid.querySelectorAll(".client-card").forEach((card) => {
    card.addEventListener("click", () => openClientDialog(card.dataset.id));
  });
}

function clientCardTemplate(client) {
  const owner = getOwner(client.ownerId);
  const members = getClientMembers(client);
  const demandCount = state.demands.filter((demand) => demand.clientId === client.id).length;
  const services = (client.services || []).slice(0, 4).map((service) => `<span class="tag">${escapeHtml(service)}</span>`).join("");
  const statusClass = client.status === "Ativo" ? "low" : client.status === "Inativo" ? "high" : "medium";
  const financeClass = client.financeStatus === "Regular" ? "low" : "high";
  const memberAvatars = members
    .slice(0, 5)
    .map(
      (person) => `
        <span class="owner-avatar" style="background:${person.color}" title="${escapeHtml(person.name)}">
          ${getInitials(person.name)}
        </span>
      `,
    )
    .join("");

  return `
    <button class="client-card" type="button" data-id="${client.id}">
      <div class="client-card-header">
        <span class="tag ${statusClass}">${escapeHtml(client.status)}</span>
        <span class="tag ${financeClass}">${escapeHtml(client.financeStatus)}</span>
      </div>
      <h3>${escapeHtml(client.name)}</h3>
      <p>${escapeHtml(client.notes || "Sem observacoes")}</p>
      <div class="tag-row">${services}</div>
      <div class="client-team">
        <span>Projeto</span>
        <span class="avatar-stack">${memberAvatars || "Sem equipe"}</span>
      </div>
      <div class="card-footer">
        <span class="owner-pill">
          <span class="owner-avatar" style="background:${owner?.color || "#202124"}">${getInitials(owner?.name)}</span>
          ${escapeHtml(owner?.name || "Sem responsavel")}
        </span>
        <span class="tag">${demandCount} demandas</span>
      </div>
    </button>
  `;
}

function renderBoard() {
  const visible = getVisibleDemands();

  elements.board.innerHTML = statuses
    .map((status) => {
      const demands = visible.filter((demand) => demand.status === status);
      const emptyText = isClientAccess() ? "Sem tarefas aqui" : "Solte uma tarefa aqui";
      const cards = demands.length ? demands.map(demandCardTemplate).join("") : `<div class="empty-state">${emptyText}</div>`;

      return `
        <section class="column" data-status="${status}">
          <div class="column-header">
            <span>${status}</span>
            <span>${demands.length}</span>
          </div>
          <div class="column-cards">${cards}</div>
        </section>
      `;
    })
    .join("");

  elements.board.querySelectorAll(".demand-card").forEach((card) => {
    card.addEventListener("click", () => {
      if (draggedDemandId) return;
      openDemandDialog(card.dataset.id);
    });
    if (!isClientAccess()) {
      card.addEventListener("dragstart", handleCardDragStart);
      card.addEventListener("dragend", handleCardDragEnd);
    }
  });

  if (!isClientAccess()) {
    elements.board.querySelectorAll(".column").forEach((column) => {
      column.addEventListener("dragover", handleColumnDragOver);
      column.addEventListener("dragleave", handleColumnDragLeave);
      column.addEventListener("drop", handleColumnDrop);
    });
  }
}

function demandCardTemplate(demand) {
  const owner = getOwner(demand.ownerId);
  const client = getClient(demand.clientId);
  const priorityClass = demand.priority === "Alta" ? "high" : demand.priority === "Media" ? "medium" : "low";
  const projectPriorityClass =
    demand.projectPriority === "Critico" ? "critical" : demand.projectPriority === "Alta" ? "high" : demand.projectPriority === "Media" ? "medium" : "low";
  const dueDate = demand.dueDate ? formatDate(demand.dueDate) : "Sem prazo";
  const lateTag = isOverdue(demand) ? `<span class="tag high">Atrasada</span>` : "";
  const deliveredLateTag = isDeliveredLate(demand) ? `<span class="tag high">Entrega atrasada</span>` : "";
  const timeBalance = (Number(demand.estimatedHours) || 0) - (Number(demand.actualHours) || 0);
  const timeClass = timeBalance < 0 ? "high" : timeBalance > 0 ? "low" : "";
  const actualHours = Number(demand.actualHours) || 0;
  const estimatedHours = Number(demand.estimatedHours) || 0;
  const checklist = normalizeChecklist(demand.checklist);
  const doneItems = checklist.filter((item) => item.done).length;
  const checklistText = checklist.length ? `${doneItems}/${checklist.length}` : "0/0";
  const calendarText = demand.calendarDate
    ? `${formatDate(demand.calendarDate)} ${demand.startTime || "09:00"}`
    : demand.dueDate
      ? `Prazo ${formatDate(demand.dueDate)}`
      : "Sem agenda";

  return `
    <button class="demand-card" type="button" draggable="${isClientAccess() ? "false" : "true"}" data-id="${demand.id}">
      <span class="card-cover ${projectPriorityClass}"></span>
      <h3 class="card-title">${escapeHtml(demand.title)}</h3>
      <div class="card-meta">
        <span>${escapeHtml(client?.name || demand.client)}</span>
        <span>•</span>
        <span class="owner-pill">
          <span class="owner-avatar" style="background:${owner?.color || "#202124"}">${getInitials(owner?.name)}</span>
          ${escapeHtml(owner?.name || "Sem responsavel")}
        </span>
      </div>
      <div class="tag-row">
        <span class="tag ${projectPriorityClass}">Projeto ${escapeHtml(demand.projectPriority || "Media")}</span>
        <span class="tag ${priorityClass}">Tarefa ${demand.priority}</span>
        <span class="tag">${escapeHtml(demand.flowType || "Ciclo mensal")}</span>
        <span class="tag">${escapeHtml(demand.stage || "Sem etapa")}</span>
        <span class="tag">${calendarText}</span>
      </div>
      <div class="card-footer">
        <span class="tag">Checklist ${checklistText}</span>
        <span class="tag ${timeClass}">${formatHours(actualHours)}/${formatHours(estimatedHours)}h</span>
        ${lateTag}
        ${deliveredLateTag}
      </div>
    </button>
  `;
}

function handleCardDragStart(event) {
  draggedDemandId = event.currentTarget.dataset.id;
  event.currentTarget.classList.add("dragging");
  event.dataTransfer.effectAllowed = "move";
  event.dataTransfer.setData("text/plain", event.currentTarget.dataset.id);
}

function handleCardDragEnd(event) {
  event.currentTarget.classList.remove("dragging");
  elements.board.querySelectorAll(".column").forEach((column) => column.classList.remove("drag-over"));
  window.setTimeout(() => {
    draggedDemandId = "";
  }, 0);
}

function handleColumnDragOver(event) {
  event.preventDefault();
  event.currentTarget.classList.add("drag-over");
  event.dataTransfer.dropEffect = "move";
}

function handleColumnDragLeave(event) {
  if (!event.currentTarget.contains(event.relatedTarget)) {
    event.currentTarget.classList.remove("drag-over");
  }
}

function handleColumnDrop(event) {
  event.preventDefault();
  const demandId = event.dataTransfer.getData("text/plain");
  const newStatus = event.currentTarget.dataset.status;
  const demand = state.demands.find((item) => item.id === demandId);

  event.currentTarget.classList.remove("drag-over");
  if (!demand || !newStatus || demand.status === newStatus) return;

  demand.status = newStatus;
  if (newStatus === "Concluido" && !demand.deliveredDate) {
    demand.deliveredDate = new Date().toISOString().slice(0, 10);
  }
  render();
}

function renderProcesses() {
  const visible = getVisibleProcesses();
  elements.processGrid.innerHTML = visible.length
    ? visible.map(processCardTemplate).join("")
    : `<div class="empty-state">Nenhum processo encontrado</div>`;

  elements.processGrid.querySelectorAll(".process-card").forEach((card) => {
    card.addEventListener("click", () => openProcessDialog(card.dataset.id));
  });
}

function processCardTemplate(process) {
  const owner = getOwner(process.ownerId);
  const checklist = (process.checklist || [])
    .slice(0, 5)
    .map((item) => `<li>${escapeHtml(item)}</li>`)
    .join("");

  return `
    <button class="process-card" type="button" data-id="${process.id}">
      <div class="process-topline">
        <span class="tag">${escapeHtml(process.area)}</span>
        <span class="tag">${escapeHtml(process.cadence)}</span>
        <span>${escapeHtml(owner?.name || "Sem responsavel")}</span>
      </div>
      <h3>${escapeHtml(process.title)}</h3>
      <p>${escapeHtml(process.objective)}</p>
      <ul class="checklist">${checklist}</ul>
    </button>
  `;
}

function renderRoles() {
  const visible = getVisibleRoles();
  elements.roleGrid.innerHTML = visible.length
    ? visible.map(roleCardTemplate).join("")
    : `<div class="empty-state">Nenhuma funcao encontrada</div>`;

  elements.roleGrid.querySelectorAll(".role-card").forEach((card) => {
    card.addEventListener("click", () => openRoleDialog(card.dataset.personId));
  });
}

function roleCardTemplate(role) {
  const person = getOwner(role.personId);
  const responsibilities = role.responsibilities.map((item) => `<li>${escapeHtml(item)}</li>`).join("");

  return `
    <button class="role-card" type="button" data-person-id="${role.personId}">
      <div class="role-topline">
        <span class="person-dot" style="background:${person?.color || "#202124"}"></span>
        <span>${escapeHtml(person?.name || "Equipe")}</span>
      </div>
      <h3>${escapeHtml(role.title)}</h3>
      <p>${escapeHtml(role.objective)}</p>
      <ul class="role-list">${responsibilities}</ul>
    </button>
  `;
}

function openPersonDialog(personId = "") {
  const person = state.people.find((item) => item.id === personId);
  elements.personForm.reset();
  elements.personId.value = person?.id || "";
  elements.personName.value = person?.name || "";
  elements.personRole.value = person?.role || "";
  elements.personEmail.value = person?.email || "";
  elements.personColor.value = person?.color || "#2f80ed";
  elements.personDialogTitle.textContent = person ? "Editar colaborador" : "Novo colaborador";
  elements.deletePersonButton.hidden = !person;
  elements.personDialog.showModal();
}

function openDemandDialog(demandId = "", presetClientId = "") {
  if (!state.people.length) {
    openPersonDialog();
    return;
  }

  const demand = state.demands.find((item) => item.id === demandId);
  const presetClient = getClient(presetClientId);
  const defaultOwnerId =
    presetClient?.memberIds?.[0] ||
    presetClient?.ownerId ||
    (selectedPersonId !== "todos" ? selectedPersonId : state.people[0].id);
  elements.demandForm.reset();
  elements.demandId.value = demand?.id || "";
  elements.demandTitle.value = demand?.title || "";
  elements.demandClient.value = demand?.clientId || findClientIdByName(demand?.client) || presetClientId || state.clients[0]?.id || "";
  elements.demandOwner.value = demand?.ownerId || defaultOwnerId;
  elements.demandStatus.value = demand?.status || "Backlog";
  elements.demandPriority.value = demand?.priority || "Media";
  elements.demandProjectPriority.value = demand?.projectPriority || demand?.priority || "Media";
  elements.demandFlowType.value = demand?.flowType || "Ciclo mensal";
  elements.demandStage.value = demand?.stage || "Ideia";
  elements.demandDueDate.value = demand?.dueDate || "";
  elements.demandDeliveredDate.value = demand?.deliveredDate || "";
  elements.demandCalendarDate.value = demand?.calendarDate || "";
  elements.demandStartTime.value = demand?.startTime || "09:00";
  elements.demandEstimatedHours.value = demand?.estimatedHours ?? "";
  elements.demandActualHours.value = demand?.actualHours ?? "";
  elements.demandDescription.value = demand?.description || "";
  elements.demandChecklist.value = checklistToText(demand?.checklist || []);
  elements.demandDialogTitle.textContent = demand ? "Editar demanda" : "Nova demanda";
  elements.deleteDemandButton.hidden = !demand;
  setDemandDialogAccess();
  elements.demandDialog.showModal();
}

function openClientDialog(clientId = "") {
  const client = state.clients.find((item) => item.id === clientId);
  elements.clientForm.reset();
  elements.clientId.value = client?.id || "";
  elements.clientName.value = client?.name || "";
  elements.clientStatus.value = client?.status || "Ativo";
  elements.clientOwner.value = client?.ownerId || (selectedPersonId !== "todos" ? selectedPersonId : state.people[0].id);
  elements.clientFinanceStatus.value = client?.financeStatus || "Regular";
  elements.clientServices.value = (client?.services || []).join("\n");
  elements.clientNotes.value = client?.notes || "";
  renderClientProjectPeople(client);
  renderClientDemandList(client?.id || "");
  elements.clientDialogTitle.textContent = client ? "Editar cliente" : "Novo cliente";
  elements.deleteClientButton.hidden = !client;
  elements.addClientDemandButton.disabled = !client;
  setClientDialogAccess(Boolean(client));
  elements.clientDialog.showModal();
}

function setDemandDialogAccess() {
  const readonly = isClientAccess();
  setFormReadonly(elements.demandForm, readonly);
  elements.deleteDemandButton.hidden = readonly || !elements.demandId.value;
  elements.demandForm.querySelector(".modal-actions .primary-button").hidden = readonly;
}

function setClientDialogAccess(hasClient) {
  const readonly = !isAdminAccess();
  setFormReadonly(elements.clientForm, readonly);
  elements.deleteClientButton.hidden = readonly || !hasClient;
  elements.addClientDemandButton.hidden = isClientAccess() || !hasClient;
  elements.clientForm.querySelector(".modal-actions .primary-button").hidden = readonly;
}

function setFormReadonly(form, readonly) {
  form.querySelectorAll("input, textarea, select").forEach((field) => {
    field.disabled = readonly;
  });
}

function renderClientProjectPeople(client) {
  const selectedIds = new Set(client?.memberIds?.length ? client.memberIds : [client?.ownerId || state.people[0]?.id]);

  elements.clientProjectPeople.innerHTML = state.people
    .map(
      (person) => `
        <label class="person-check">
          <input type="checkbox" value="${person.id}" ${selectedIds.has(person.id) ? "checked" : ""} />
          <span class="owner-avatar" style="background:${person.color}">${getInitials(person.name)}</span>
          <span>
            <strong>${escapeHtml(person.name)}</strong>
            <small>${escapeHtml(person.role)}</small>
          </span>
        </label>
      `,
    )
    .join("");
}

function renderClientDemandList(clientId) {
  const clientDemands = state.demands
    .filter((demand) => demand.clientId === clientId)
    .sort((a, b) => (a.status === "Concluido") - (b.status === "Concluido") || String(a.dueDate).localeCompare(String(b.dueDate)));

  elements.clientDemandList.innerHTML = clientId
    ? clientDemands.length
      ? clientDemands.map(clientDemandRowTemplate).join("")
      : `<div class="empty-state compact">Nenhuma demanda criada para este cliente.</div>`
    : `<div class="empty-state compact">Salve o cliente para criar demandas pontuais.</div>`;

  elements.clientDemandList.querySelectorAll("[data-client-demand-id]").forEach((button) => {
    button.addEventListener("click", () => {
      elements.clientDialog.close();
      openDemandDialog(button.dataset.clientDemandId);
    });
  });
}

function clientDemandRowTemplate(demand) {
  const owner = getOwner(demand.ownerId);
  return `
    <button class="client-demand-row" type="button" data-client-demand-id="${demand.id}">
      <span>
        <strong>${escapeHtml(demand.title)}</strong>
        <small>${escapeHtml(owner?.name || "Sem responsavel")} - ${escapeHtml(demand.stage || demand.flowType)}</small>
      </span>
      <span class="tag ${getPriorityClass(demand.priority)}">${escapeHtml(demand.status)}</span>
    </button>
  `;
}

function getPriorityClass(priority) {
  return priority === "Alta" ? "high" : priority === "Baixa" ? "low" : "medium";
}

function openCycleDialog() {
  elements.cycleForm.reset();
  elements.cycleClient.value = state.clients[0]?.id || "";
  elements.cycleProjectPriority.value = "Media";
  elements.cyclePeople.innerHTML = state.people
    .map(
      (person) => `
        <label class="person-check">
          <input type="checkbox" value="${person.id}" checked />
          <span class="owner-avatar" style="background:${person.color}">${getInitials(person.name)}</span>
          <span>
            <strong>${escapeHtml(person.name)}</strong>
            <small>${escapeHtml(person.role)}</small>
          </span>
        </label>
      `,
    )
    .join("");
  elements.cycleDialog.showModal();
}

function openRoleDialog(personId) {
  const person = getOwner(personId);
  const role = state.roles.find((item) => item.personId === personId) || {
    personId,
    title: person?.role || "",
    objective: "",
    responsibilities: [],
  };

  elements.roleForm.reset();
  elements.rolePersonId.value = personId;
  elements.rolePersonSelect.value = personId;
  elements.roleTitle.value = role.title || person?.role || "";
  elements.roleObjective.value = role.objective || "";
  elements.roleResponsibilities.value = (role.responsibilities || []).join("\n");
  elements.roleDialogTitle.textContent = `Editar funcao - ${person?.name || "Equipe"}`;
  elements.roleDialog.showModal();
}

function openProcessDialog(processId = "") {
  if (!state.people.length) {
    openPersonDialog();
    return;
  }

  const process = state.processes.find((item) => item.id === processId);
  elements.processForm.reset();
  elements.processId.value = process?.id || "";
  elements.processTitle.value = process?.title || "";
  elements.processArea.value = process?.area || "";
  elements.processOwner.value = process?.ownerId || (selectedPersonId !== "todos" ? selectedPersonId : state.people[0].id);
  elements.processCadence.value = process?.cadence || "Mensal";
  elements.processObjective.value = process?.objective || "";
  elements.processChecklist.value = (process?.checklist || []).join("\n");
  elements.processDialogTitle.textContent = process ? "Editar processo" : "Novo processo";
  elements.deleteProcessButton.hidden = !process;
  elements.processDialog.showModal();
}

function savePerson(event) {
  event.preventDefault();
  if (!isAdminAccess()) return;
  const person = {
    id: elements.personId.value || crypto.randomUUID(),
    name: elements.personName.value.trim(),
    role: elements.personRole.value.trim(),
    email: elements.personEmail.value.trim(),
    color: elements.personColor.value,
  };

  if (!person.name || !person.role) return;

  const index = state.people.findIndex((item) => item.id === person.id);
  if (index >= 0) state.people[index] = person;
  else state.people.push(person);

  const role = state.roles.find((item) => item.personId === person.id);
  if (role && !role.title) role.title = person.role;

  selectedPersonId = person.id;
  elements.personDialog.close();
  render();
}

function deletePerson() {
  if (!isAdminAccess()) return;
  const personId = elements.personId.value;
  if (!personId) return;

  const hasDemands = state.demands.some((demand) => demand.ownerId === personId);
  const hasProcesses = state.processes.some((process) => process.ownerId === personId);
  if ((hasDemands || hasProcesses) && !confirm("Este colaborador tem demandas/processos. Excluir tambem esses itens?")) return;

  state.people = state.people.filter((person) => person.id !== personId);
  state.demands = state.demands.filter((demand) => demand.ownerId !== personId);
  state.processes = state.processes.filter((process) => process.ownerId !== personId);
  state.roles = state.roles.filter((role) => role.personId !== personId);
  selectedPersonId = "todos";
  elements.personDialog.close();
  render();
}

function saveDemand(event) {
  event.preventDefault();
  if (isClientAccess()) return;
  const ownerId = elements.demandOwner.value;
  const client = getClient(elements.demandClient.value);
  const demand = {
    id: elements.demandId.value || crypto.randomUUID(),
    title: elements.demandTitle.value.trim(),
    clientId: client?.id || "",
    client: client?.name || "",
    ownerId,
    status: elements.demandStatus.value,
    priority: elements.demandPriority.value,
    projectPriority: elements.demandProjectPriority.value,
    flowType: elements.demandFlowType.value,
    stage: elements.demandStage.value,
    dueDate: elements.demandDueDate.value,
    deliveredDate: elements.demandDeliveredDate.value,
    calendarDate: elements.demandCalendarDate.value,
    startTime: elements.demandStartTime.value || "09:00",
    estimatedHours: parseHours(elements.demandEstimatedHours.value),
    actualHours: parseHours(elements.demandActualHours.value),
    checklist: parseChecklistText(elements.demandChecklist.value),
    description: elements.demandDescription.value.trim(),
  };

  if (!demand.title || !demand.client || !ownerId) return;

  const index = state.demands.findIndex((item) => item.id === demand.id);
  if (index >= 0) state.demands[index] = demand;
  else state.demands.push(demand);

  elements.demandDialog.close();
  render();
  syncCalendarIfEnabled([demand]);
}

function saveClient(event) {
  event.preventDefault();
  if (!isAdminAccess()) return;
  const selectedMemberIds = [...elements.clientProjectPeople.querySelectorAll("input:checked")].map((input) => input.value);
  const ownerId = elements.clientOwner.value;
  const client = {
    id: elements.clientId.value || slugify(elements.clientName.value) || crypto.randomUUID(),
    name: elements.clientName.value.trim(),
    status: elements.clientStatus.value,
    ownerId,
    financeStatus: elements.clientFinanceStatus.value,
    memberIds: [...new Set([ownerId, ...selectedMemberIds])],
    services: elements.clientServices.value
      .split("\n")
      .map((item) => item.trim())
      .filter(Boolean),
    notes: elements.clientNotes.value.trim(),
  };

  if (!client.name) return;

  const index = state.clients.findIndex((item) => item.id === client.id);
  if (index >= 0) state.clients[index] = client;
  else state.clients.push(client);

  state.demands = state.demands.map((demand) =>
    demand.clientId === client.id ? { ...demand, client: client.name } : demand,
  );

  elements.clientDialog.close();
  render();
}

function openDemandFromClient() {
  const clientId = elements.clientId.value;
  if (!clientId) return;
  elements.clientDialog.close();
  openDemandDialog("", clientId);
}

function deleteClient() {
  if (!isAdminAccess()) return;
  const clientId = elements.clientId.value;
  const hasDemands = state.demands.some((demand) => demand.clientId === clientId);
  if (hasDemands && !confirm("Este cliente tem demandas. Excluir tambem essas demandas?")) return;

  state.clients = state.clients.filter((client) => client.id !== clientId);
  state.demands = state.demands.filter((demand) => demand.clientId !== clientId);
  elements.clientDialog.close();
  render();
}

function generateCycleDemands(event) {
  event.preventDefault();
  const client = getClient(elements.cycleClient.value);
  const cycleType = elements.cycleType.value;
  const selectedPeople = [...elements.cyclePeople.querySelectorAll("input:checked")].map((input) => input.value);
  const templates = cycleDemandTemplates[cycleType] || {};
  const notes = elements.cycleNotes.value.trim();
  const created = [];

  if (!client || !selectedPeople.length) return;

  selectedPeople.forEach((personId) => {
    const template = templates[personId] || defaultCycleTemplate(cycleType, personId);
    if (!template) return;

    const checklist = template.checklistKey
      ? checklistTemplates[template.checklistKey].map((text) => ({ text, done: false }))
      : (template.checklist || checklistTemplates.team).map((text) => ({ text, done: false }));

    created.push({
      id: crypto.randomUUID(),
      title: template.title,
      clientId: client.id,
      client: client.name,
      ownerId: personId,
      status: "Backlog",
      priority: template.priority || "Media",
      projectPriority: elements.cycleProjectPriority.value,
      flowType: cycleType,
      stage: template.stage || "Ideia",
      dueDate: elements.cycleDueDate.value,
      deliveredDate: "",
      calendarDate: "",
      startTime: "09:00",
      estimatedHours: template.estimatedHours || 1,
      actualHours: 0,
      checklist,
      description: [template.description || "", notes].filter(Boolean).join("\n"),
    });
  });

  state.demands.push(...created);
  elements.cycleDialog.close();
  selectedView = "demands";
  render();

  if (created.length) {
    alert(`${created.length} demandas criadas para ${client.name}.`);
  }
}

function defaultCycleTemplate(cycleType, personId) {
  const person = getOwner(personId);
  if (!person) return null;

  return {
    title: `${cycleType} - ${person.name}`,
    stage: "Ideia",
    estimatedHours: 1,
    checklistKey: "team",
    description: `Demanda criada para ${person.name} dentro do ciclo ${cycleType}.`,
  };
}

function saveRole(event) {
  event.preventDefault();
  if (!isAdminAccess()) return;
  const originalPersonId = elements.rolePersonId.value;
  const personId = elements.rolePersonSelect.value;
  const role = {
    personId,
    title: elements.roleTitle.value.trim(),
    objective: elements.roleObjective.value.trim(),
    responsibilities: elements.roleResponsibilities.value
      .split("\n")
      .map((item) => item.trim())
      .filter(Boolean),
  };

  if (!role.title || !role.objective) return;

  state.roles = state.roles.filter((item) => item.personId !== originalPersonId && item.personId !== personId);
  state.roles.push(role);

  const person = getOwner(personId);
  if (person) person.role = role.title;

  elements.roleDialog.close();
  render();
}

function deleteDemand() {
  if (isClientAccess()) return;
  const demandId = elements.demandId.value;
  state.demands = state.demands.filter((demand) => demand.id !== demandId);
  elements.demandDialog.close();
  render();
}

function applyChecklistTemplate(templateKey) {
  const template = checklistTemplates[templateKey] || [];
  const existing = elements.demandChecklist.value.trim();
  const nextText = template.map((item) => `[ ] ${item}`).join("\n");
  elements.demandChecklist.value = existing ? `${existing}\n${nextText}` : nextText;

  const flowByTemplate = {
    onboarding: "Onboarding",
    initial: "Demandas iniciais",
    monthly: "Ciclo mensal",
    team: elements.demandFlowType.value,
  };
  if (flowByTemplate[templateKey]) elements.demandFlowType.value = flowByTemplate[templateKey];
}

function saveProcess(event) {
  event.preventDefault();
  if (!isAdminAccess()) return;
  const process = {
    id: elements.processId.value || crypto.randomUUID(),
    title: elements.processTitle.value.trim(),
    area: elements.processArea.value.trim(),
    ownerId: elements.processOwner.value,
    cadence: elements.processCadence.value,
    objective: elements.processObjective.value.trim(),
    checklist: elements.processChecklist.value
      .split("\n")
      .map((item) => item.trim())
      .filter(Boolean),
  };

  if (!process.title || !process.area || !process.objective) return;

  const index = state.processes.findIndex((item) => item.id === process.id);
  if (index >= 0) state.processes[index] = process;
  else state.processes.push(process);

  elements.processDialog.close();
  render();
}

function deleteProcess() {
  if (!isAdminAccess()) return;
  const processId = elements.processId.value;
  state.processes = state.processes.filter((process) => process.id !== processId);
  elements.processDialog.close();
  render();
}

function exportData() {
  const blob = new Blob([JSON.stringify(state, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "sou-demandas.json";
  link.click();
  URL.revokeObjectURL(url);
}

function exportCalendar() {
  const calendarDemands = state.demands
    .map(normalizeDemand)
    .filter((demand) => demand.calendarDate || demand.dueDate);
  const skipped = state.demands.length - calendarDemands.length;

  if (!calendarDemands.length) {
    alert("Nenhuma demanda tem data de agenda ou prazo definido.");
    return;
  }

  const events = calendarDemands.map((demand) => demandToIcsEvent(demand)).join("\r\n");
  const content = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//SOU Marketing//SOU Ops//PT-BR",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    events,
    "END:VCALENDAR",
  ].join("\r\n");

  const blob = new Blob([content], { type: "text/calendar;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "sou-agenda-demandas.ics";
  link.click();
  URL.revokeObjectURL(url);

  if (skipped) {
    alert(`${calendarDemands.length} demandas exportadas. ${skipped} demandas ficaram de fora por falta de data.`);
  }
}

function openCalendarSettings() {
  elements.calendarWebhookUrl.value = calendarSettings.webhookUrl;
  elements.calendarAutoSync.checked = calendarSettings.autoSync;
  elements.calendarDialog.showModal();
}

function saveCalendarConnection(event) {
  event.preventDefault();
  calendarSettings = {
    webhookUrl: elements.calendarWebhookUrl.value.trim(),
    autoSync: elements.calendarAutoSync.checked,
  };
  saveCalendarSettings();
  elements.calendarDialog.close();
}

function syncCalendarIfEnabled(demands = state.demands) {
  if (!calendarSettings.autoSync || !calendarSettings.webhookUrl) return;
  syncCalendar(demands, { silent: true });
}

async function syncCalendar(demands = state.demands, options = {}) {
  if (!calendarSettings.webhookUrl) {
    if (!options.silent) openCalendarSettings();
    return;
  }

  const items = demands
    .map(normalizeDemand)
    .filter((demand) => demand.calendarDate || demand.dueDate)
    .map((demand) => {
      const owner = getOwner(demand.ownerId);
      const client = getClient(demand.clientId);
      return {
        id: demand.id,
        title: demand.title,
        client: client?.name || demand.client,
        ownerName: owner?.name || "",
        ownerEmail: owner?.email || "",
        status: demand.status,
        priority: demand.priority,
        projectPriority: demand.projectPriority,
        flowType: demand.flowType,
        stage: demand.stage,
        date: demand.calendarDate || demand.dueDate,
        startTime: demand.startTime || "09:00",
        durationHours: Number(demand.estimatedHours) || 1,
        description: demand.description,
        checklist: normalizeChecklist(demand.checklist),
      };
    });

  if (!items.length) {
    if (!options.silent) alert("Nenhuma demanda tem data de agenda ou prazo definido.");
    return;
  }

  try {
    await fetch(calendarSettings.webhookUrl, {
      method: "POST",
      mode: "no-cors",
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: JSON.stringify({ source: "SOU Ops", timezone: "America/Sao_Paulo", items }),
    });
    if (!options.silent) {
      alert("Sincronizacao enviada ao Google Agenda. Aguarde alguns segundos e confira sua agenda.");
    }
  } catch {
    if (!options.silent) {
      alert("Nao foi possivel enviar para o Google Agenda. Confira a URL do Apps Script.");
    }
  }
}

function demandToIcsEvent(demand) {
  const owner = getOwner(demand.ownerId);
  const date = demand.calendarDate || demand.dueDate;
  const startTime = demand.startTime || "09:00";
  const durationHours = Number(demand.estimatedHours) || 1;
  const start = createLocalDate(date, startTime);
  const end = new Date(start.getTime() + durationHours * 60 * 60 * 1000);
  const checklist = normalizeChecklist(demand.checklist);
  const description = [
    demand.description,
    `Cliente: ${demand.client}`,
    `Responsavel: ${owner?.name || "Sem responsavel"}`,
    `Tipo: ${demand.flowType || "Ciclo mensal"}`,
    `Etapa: ${demand.stage || "Sem etapa"}`,
    `Prioridade do projeto: ${demand.projectPriority || "Media"}`,
    `Tempo previsto: ${formatHours(durationHours)}h`,
    checklist.length ? `Checklist:\\n${checklist.map((item) => `${item.done ? "[x]" : "[ ]"} ${item.text}`).join("\\n")}` : "",
  ]
    .filter(Boolean)
    .join("\\n");
  const attendee = owner?.email
    ? [`ATTENDEE;CN=${icsEscape(owner.name)};ROLE=REQ-PARTICIPANT;PARTSTAT=NEEDS-ACTION;RSVP=FALSE:mailto:${owner.email}`]
    : [];

  return [
    "BEGIN:VEVENT",
    `UID:${demand.id}@sou-ops.local`,
    `DTSTAMP:${formatIcsUtc(new Date())}`,
    `DTSTART:${formatIcsLocal(start)}`,
    `DTEND:${formatIcsLocal(end)}`,
    `SUMMARY:${icsEscape(`${demand.client} - ${demand.title}`)}`,
    `DESCRIPTION:${icsEscape(description)}`,
    `CATEGORIES:${icsEscape(demand.flowType || "Demandas")}`,
    ...attendee,
    "END:VEVENT",
  ].join("\r\n");
}

function importData(event) {
  const file = event.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = () => {
    try {
      const imported = JSON.parse(reader.result);
      if (!Array.isArray(imported.people) || !Array.isArray(imported.demands)) {
        alert("Arquivo invalido.");
        return;
      }

      state = {
        people: imported.people.map(normalizePerson),
        clients: Array.isArray(imported.clients) ? imported.clients.map(normalizeClient) : clientsSeed,
        demands: imported.demands.map(normalizeDemand),
        processes: Array.isArray(imported.processes) ? imported.processes : processesSeed,
        roles: Array.isArray(imported.roles) ? imported.roles : rolesSeed,
      };
      selectedPersonId = "todos";
      render();
    } catch {
      alert("Nao foi possivel importar o arquivo.");
    }
  };
  reader.readAsText(file);
  event.target.value = "";
}

function isOverdue(demand) {
  if (!demand.dueDate || demand.status === "Concluido") return false;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return new Date(`${demand.dueDate}T00:00:00`) < today;
}

function isDeliveredLate(demand) {
  if (!demand.dueDate || !demand.deliveredDate) return false;
  return new Date(`${demand.deliveredDate}T00:00:00`) > new Date(`${demand.dueDate}T00:00:00`);
}

function sumHours(items, key) {
  return items.reduce((total, item) => total + (Number(item[key]) || 0), 0);
}

function parseHours(value) {
  const parsed = Number.parseFloat(value);
  return Number.isFinite(parsed) ? parsed : 0;
}

function parseChecklistText(value = "") {
  return value
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => {
      const done = /^\[(x|X)\]\s*/.test(line);
      const text = line.replace(/^\[( |x|X)\]\s*/, "").trim();
      return { text, done };
    })
    .filter((item) => item.text);
}

function checklistToText(checklist = []) {
  return normalizeChecklist(checklist)
    .map((item) => `[${item.done ? "x" : " "}] ${item.text}`)
    .join("\n");
}

function formatHours(value) {
  const rounded = Math.round(value * 100) / 100;
  return Number.isInteger(rounded) ? String(rounded) : String(rounded.toFixed(2));
}

function formatDate(value) {
  return new Intl.DateTimeFormat("pt-BR", { day: "2-digit", month: "2-digit" }).format(
    new Date(`${value}T00:00:00`),
  );
}

function createLocalDate(date, time) {
  const [year, month, day] = date.split("-").map(Number);
  const [hour, minute] = time.split(":").map(Number);
  return new Date(year, month - 1, day, hour || 9, minute || 0, 0);
}

function formatIcsLocal(date) {
  const pad = (value) => String(value).padStart(2, "0");
  return `${date.getFullYear()}${pad(date.getMonth() + 1)}${pad(date.getDate())}T${pad(date.getHours())}${pad(date.getMinutes())}00`;
}

function formatIcsUtc(date) {
  return date.toISOString().replace(/[-:]/g, "").replace(/\.\d{3}Z$/, "Z");
}

function icsEscape(value = "") {
  return String(value)
    .replace(/\\/g, "\\\\")
    .replace(/\n/g, "\\n")
    .replace(/,/g, "\\,")
    .replace(/;/g, "\\;");
}

function countBy(items, key) {
  return items.reduce((counts, item) => {
    const value = item[key] || "Sem etapa";
    counts[value] = (counts[value] || 0) + 1;
    return counts;
  }, {});
}

function getInitials(name = "") {
  return String(name)
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();
}

function slugify(value = "") {
  return String(value)
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function escapeHtml(value = "") {
  return String(value).replace(/[&<>"']/g, (char) => {
    const entities = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;" };
    return entities[char];
  });
}

elements.viewTabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    selectedView = tab.dataset.view;
    render();
  });
});
elements.calendarSettingsButton.addEventListener("click", openCalendarSettings);
elements.calendarForm.addEventListener("submit", saveCalendarConnection);
elements.syncCalendarButton.addEventListener("click", () => syncCalendar());
elements.testCalendarSyncButton.addEventListener("click", () => {
  calendarSettings = {
    webhookUrl: elements.calendarWebhookUrl.value.trim(),
    autoSync: elements.calendarAutoSync.checked,
  };
  saveCalendarSettings();
  syncCalendar();
});
elements.accessRole.addEventListener("change", () => {
  currentAccess = {
    role: elements.accessRole.value,
    profileId: "",
  };
  selectedPersonId = "todos";
  selectedView = "dashboard";
  render();
});
elements.accessProfile.addEventListener("change", () => {
  currentAccess.profileId = elements.accessProfile.value;
  selectedPersonId = isCollaboratorAccess() ? currentAccess.profileId : "todos";
  selectedView = "dashboard";
  render();
});
elements.addClientButton.addEventListener("click", () => openClientDialog());
elements.clientForm.addEventListener("submit", saveClient);
elements.deleteClientButton.addEventListener("click", deleteClient);
elements.addClientDemandButton.addEventListener("click", openDemandFromClient);
elements.generateCycleButton.addEventListener("click", openCycleDialog);
elements.cycleForm.addEventListener("submit", generateCycleDemands);
elements.addPersonButton.addEventListener("click", () => openPersonDialog());
elements.addDemandButton.addEventListener("click", () => openDemandDialog());
elements.addProcessButton.addEventListener("click", () => openProcessDialog());
elements.personForm.addEventListener("submit", savePerson);
elements.demandForm.addEventListener("submit", saveDemand);
elements.processForm.addEventListener("submit", saveProcess);
elements.roleForm.addEventListener("submit", saveRole);
elements.deletePersonButton.addEventListener("click", deletePerson);
elements.deleteDemandButton.addEventListener("click", deleteDemand);
elements.deleteProcessButton.addEventListener("click", deleteProcess);
elements.editRolePersonButton.addEventListener("click", () => {
  const personId = elements.rolePersonSelect.value;
  elements.roleDialog.close();
  openPersonDialog(personId);
});
document.querySelectorAll("[data-checklist-template]").forEach((button) => {
  button.addEventListener("click", () => applyChecklistTemplate(button.dataset.checklistTemplate));
});
elements.statusFilter.addEventListener("change", render);
elements.searchInput.addEventListener("input", () => {
  elements.globalSearchMirror.value = elements.searchInput.value;
  render();
});
elements.globalSearchMirror.addEventListener("input", () => {
  elements.searchInput.value = elements.globalSearchMirror.value;
  render();
});
elements.exportButton.addEventListener("click", exportData);
elements.exportCalendarButton.addEventListener("click", exportCalendar);
elements.importFile.addEventListener("change", importData);
document.querySelectorAll("[data-close-dialog]").forEach((button) => {
  button.addEventListener("click", () => {
    document.querySelector(`#${button.dataset.closeDialog}`)?.close();
  });
});

render();
