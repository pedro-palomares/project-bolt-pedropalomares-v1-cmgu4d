import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.VITE_SUPABASE_URL || 'https://hqatmwfwcoayfnexvuak.supabase.co';
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhxYXRtd2Z3Y29heWZuZXh2dWFrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzE3NjQxMjYsImV4cCI6MjA0NzM0MDEyNn0.0aNuobgVLpXj-60dOGmJeVc1MYKIXMQsd0uWGU9ULPc';

const supabase = createClient(supabaseUrl, supabaseKey);

const TEST_USER = {
  email: 'test@example.com',
  password: 'test123456',
  name: 'Test User'
};

async function testAuth() {
  console.log('🧪 Iniciando pruebas de autenticación...\n');

  try {
    // Test 1: Registro
    console.log('📝 Probando registro...');
    const { data: registerData, error: registerError } = await supabase.auth.signUp({
      email: TEST_USER.email,
      password: TEST_USER.password,
      options: {
        data: { name: TEST_USER.name }
      }
    });

    if (registerError) throw registerError;
    console.log('✅ Registro exitoso:', registerData.user?.email);

    // Test 2: Login
    console.log('\n🔑 Probando login...');
    const { data: loginData, error: loginError } = await supabase.auth.signInWithPassword({
      email: TEST_USER.email,
      password: TEST_USER.password
    });

    if (loginError) throw loginError;
    console.log('✅ Login exitoso:', loginData.user?.email);

    // Test 3: Obtener sesión actual
    console.log('\n📍 Probando obtener sesión...');
    const { data: sessionData } = await supabase.auth.getSession();
    console.log('✅ Sesión obtenida:', sessionData.session?.user.email);

    // Test 4: Logout
    console.log('\n👋 Probando logout...');
    const { error: logoutError } = await supabase.auth.signOut();
    if (logoutError) throw logoutError;
    console.log('✅ Logout exitoso');

  } catch (error) {
    console.error('\n❌ Error en las pruebas:', error.message);
    process.exit(1);
  }
}

testAuth();