// Estrutura inicial para autenticacao futura com Supabase Auth.
// Este arquivo nao substitui o login local.

(function setupSupabaseAuth(global) {
  const LOG_PREFIX = "[SOU Supabase Auth]";

  function getSupabaseClient() {
    if (global.SOU_SUPABASE_CLIENT) return global.SOU_SUPABASE_CLIENT;

    if (!global.supabase?.createClient) {
      throw new Error("Biblioteca Supabase ainda nao foi carregada.");
    }

    const config = global.assertSouSupabaseConfig();
    global.SOU_SUPABASE_CLIENT = global.supabase.createClient(config.url, config.anonKey);
    return global.SOU_SUPABASE_CLIENT;
  }

  function canUseSupabaseAuth() {
    return Boolean(global.supabase?.createClient && global.hasSouSupabaseConfig?.());
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

  async function getProfileForUserId(userId) {
    const client = getSupabaseClient();

    if (!userId) return { profile: null, error: null };

    const { data, error } = await client
      .from("profiles")
      .select("*")
      .eq("auth_user_id", userId)
      .maybeSingle();

    return { profile: data || null, error };
  }

  async function loginAndGetProfile({ email, password }) {
    const loginResult = await login({ email, password });

    if (loginResult.error) {
      return { user: null, profile: null, error: loginResult.error };
    }

    const user = loginResult.data?.user || null;
    const { profile, error: profileError } = await getProfileForUserId(user?.id);

    return {
      session: loginResult.data?.session || null,
      user,
      profile,
      error: profileError,
    };
  }

  async function logout() {
    const client = getSupabaseClient();
    return client.auth.signOut();
  }

  async function updatePassword(newPassword) {
    const client = getSupabaseClient();
    return client.auth.updateUser({ password: newPassword });
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
    const { user, error: userError } = await getCurrentUser();

    if (userError) return { profile: null, error: userError };
    if (!user) return { profile: null, error: null };

    return getProfileForUserId(user.id);
  }

  async function getCurrentAuthContext() {
    if (!canUseSupabaseAuth()) {
      return { session: null, user: null, profile: null, role: null, error: null };
    }

    const { session, error: sessionError } = await getCurrentSession();
    if (sessionError) return { session: null, user: null, profile: null, role: null, error: sessionError };
    if (!session?.user) return { session: null, user: null, profile: null, role: null, error: null };

    const { user, error: userError } = await getCurrentUser();
    if (userError) return { session, user: null, profile: null, role: null, error: userError };

    const { profile, error: profileError } = await getProfileForUserId(user?.id);

    return {
      session,
      user,
      profile,
      role: profile?.role || null,
      error: profileError,
    };
  }

  async function logCurrentAuthenticatedProfile() {
    if (!canUseSupabaseAuth()) {
      console.log(`${LOG_PREFIX} configuracao ausente; auth real ainda nao foi validado.`);
      return;
    }

    const { user, error: userError } = await getCurrentUser();

    if (userError) {
      console.log(`${LOG_PREFIX} erro ao validar usuario atual`, userError);
      return;
    }

    if (!user) {
      console.log(`${LOG_PREFIX} nenhuma sessao ativa.`);
      return;
    }

    const { profile, error: profileError } = await getProfileForCurrentUser();

    if (profileError) {
      console.log(`${LOG_PREFIX} usuario autenticado sem profile carregado`, {
        id: user.id,
        email: user.email,
        role: null,
      });
      return;
    }

    console.log(`${LOG_PREFIX} profile autenticado`, {
      id: user.id,
      email: user.email,
      role: profile?.role || null,
    });
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
    loginAndGetProfile,
    logout,
    updatePassword,
    getCurrentUser,
    getCurrentSession,
    getCurrentAuthContext,
    getProfileForUserId,
    getProfileForCurrentUser,
    prepareProfilePayload,
    logCurrentAuthenticatedProfile,
  };

  logCurrentAuthenticatedProfile();
})(window);
