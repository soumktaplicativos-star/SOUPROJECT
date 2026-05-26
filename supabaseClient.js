// Configuracao temporaria para Supabase em HTML/CSS/JS puro.
// Nao usa Vite e nao le .env diretamente no navegador.
// Preencha apenas a chave publica/publishable quando a integracao for ativada.

(function setupSupabaseConfig(global) {
  const existingConfig = global.SOU_SUPABASE_CONFIG || {};
  const localUrl = global.localStorage?.getItem("SOU_SUPABASE_URL") || "";
  const localAnonKey =
    global.localStorage?.getItem("SOU_SUPABASE_ANON_KEY") ||
    global.localStorage?.getItem("SOU_SUPABASE_PUBLISHABLE_KEY") ||
    "";
  const resolvedUrl = existingConfig.url || localUrl;
  const resolvedAnonKey = existingConfig.anonKey || existingConfig.publishableKey || localAnonKey;

  global.SOU_SUPABASE_CONFIG = {
    url: resolvedUrl,
    anonKey: resolvedAnonKey,
    publishableKey: resolvedAnonKey,
  };

  console.log("[SOU Supabase] Supabase client config status", {
    hasUrl: Boolean(resolvedUrl),
    hasAnonKey: Boolean(resolvedAnonKey),
  });

  global.hasSouSupabaseConfig = function hasSouSupabaseConfig() {
    return Boolean(global.SOU_SUPABASE_CONFIG.url && global.SOU_SUPABASE_CONFIG.anonKey);
  };

  global.assertSouSupabaseConfig = function assertSouSupabaseConfig() {
    if (!global.hasSouSupabaseConfig()) {
      throw new Error("Configure SOU_SUPABASE_CONFIG.url e SOU_SUPABASE_CONFIG.anonKey antes de usar Supabase.");
    }

    return global.SOU_SUPABASE_CONFIG;
  };
})(window);
