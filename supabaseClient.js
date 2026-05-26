// Configuracao temporaria para uso futuro com Supabase em HTML/CSS/JS puro.
// Este arquivo ainda nao e importado pelo app atual e nao cria conexao sozinho.
// Preencha apenas a chave publica/publishable quando a integracao for ativada.

(function setupSupabaseConfig(global) {
  global.SOU_SUPABASE_CONFIG = {
    url: "",
    anonKey: "",
  };

  global.assertSouSupabaseConfig = function assertSouSupabaseConfig() {
    if (!global.SOU_SUPABASE_CONFIG.url || !global.SOU_SUPABASE_CONFIG.anonKey) {
      throw new Error("Configure SOU_SUPABASE_CONFIG.url e SOU_SUPABASE_CONFIG.anonKey antes de usar Supabase.");
    }

    return global.SOU_SUPABASE_CONFIG;
  };
})(window);
