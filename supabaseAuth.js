// Estrutura inicial para autenticacao futura com Supabase Auth.
// Este arquivo ainda nao e importado pelo app atual e nao substitui o login local.

(function setupSupabaseAuth(global) {
  function getSupabaseClient() {
    if (global.SOU_SUPABASE_CLIENT) return global.SOU_SUPABASE_CLIENT;

    if (!global.supabase?.createClient) {
      throw new Error("Biblioteca Supabase ainda nao foi carregada.");
    }

    const config = global.assertSouSupabaseConfig();
    global.SOU_SUPABASE_CLIENT = global.supabase.createClient(config.url, config.anonKey);
    return global.SOU_SUPABASE_CLIENT;
  }

  async function signup({ email, password, metadata = {} }) {
    const client = getSupabaseClient();

    return client.auth.signUp({
      email,
      password,
      options: {
        data: metadata,
      },
    });
  }

  async function login({ email, password }) {
    const client = getSupabaseClient();

    return client.auth.signInWithPassword({
      email,
      password,
    });
  }

  async function logout() {
    const client = getSupabaseClient();
    return client.auth.signOut();
  }

  async function getCurrentUser() {
    const client = getSupabaseClient();
    const { data, error } = await client.auth.getUser();

    if (error) return { user: null, error };
    return { user: data.user || null, error: null };
  }

  async function getCurrentSession() {
    const client = getSupabaseClient();
    const { data, error } = await client.auth.getSession();

    if (error) return { session: null, error };
    return { session: data.session || null, error: null };
  }

  async function getProfileForCurrentUser() {
    const client = getSupabaseClient();
    const { user, error: userError } = await getCurrentUser();

    if (userError) return { profile: null, error: userError };
    if (!user) return { profile: null, error: null };

    const { data, error } = await client
      .from("profiles")
      .select("*")
      .eq("auth_user_id", user.id)
      .single();

    return { profile: data || null, error };
  }

  function prepareProfilePayload(user, profileData = {}) {
    return {
      auth_user_id: user.id,
      email: user.email,
      name: profileData.name || user.user_metadata?.name || user.email,
      role: profileData.role || "client",
      position: profileData.position || null,
      color: profileData.color || null,
      status: profileData.status || "active",
    };
  }

  global.SOU_SUPABASE_AUTH = {
    signup,
    login,
    logout,
    getCurrentUser,
    getCurrentSession,
    getProfileForCurrentUser,
    prepareProfilePayload,
  };
})(window);
