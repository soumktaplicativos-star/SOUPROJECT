// Configuracao publica do Supabase para HTML/CSS/JS puro.
// Use somente a URL publica e a chave anon/publishable.
// Nunca coloque service_role neste arquivo.
// Desenvolvimento local: preencha temporariamente os campos abaixo quando for testar o login real.

window.SOU_SUPABASE_CONFIG = {
  url: "https://cxzssrlfoqkpfufuirsn.supabase.co",
  anonKey: "sb_publishable_Y8QeCag5vdxyu0PlLJAFaQ_CLflG58k",
  publishableKey: "sb_publishable_Y8QeCag5vdxyu0PlLJAFaQ_CLflG58k",
};

console.log("[SOU Supabase] Supabase config loaded", {
  hasUrl: Boolean(window.SOU_SUPABASE_CONFIG.url),
  hasAnonKey: Boolean(window.SOU_SUPABASE_CONFIG.anonKey || window.SOU_SUPABASE_CONFIG.publishableKey),
});
