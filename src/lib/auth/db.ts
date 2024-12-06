import { supabase } from '../db';
import { User, Session } from './types';

export const createUser = async (email: string, name: string, hashedPassword: string): Promise<User> => {
  const { data, error } = await supabase
    .from('users')
    .insert([{ email, name, hashed_password: hashedPassword }])
    .select()
    .single();

  if (error) throw error;
  
  return {
    id: data.id,
    email: data.email,
    name: data.name,
    hashedPassword: data.hashed_password
  };
};

export const findUserByEmail = async (email: string): Promise<User | null> => {
  const { data, error } = await supabase
    .from('users')
    .select()
    .eq('email', email)
    .single();

  if (error) return null;
  
  return data ? {
    id: data.id,
    email: data.email,
    name: data.name,
    hashedPassword: data.hashed_password
  } : null;
};

export const createSession = async (userId: string, token: string): Promise<Session> => {
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 days

  const { data, error } = await supabase
    .from('sessions')
    .insert([{ user_id: userId, token, expires_at: expiresAt }])
    .select()
    .single();

  if (error) throw error;

  return {
    id: data.id,
    userId: data.user_id,
    token: data.token,
    expiresAt: new Date(data.expires_at).getTime()
  };
};

export const findSessionByToken = async (token: string): Promise<Session | null> => {
  const { data, error } = await supabase
    .from('sessions')
    .select()
    .eq('token', token)
    .gt('expires_at', new Date().toISOString())
    .single();

  if (error) return null;

  return data ? {
    id: data.id,
    userId: data.user_id,
    token: data.token,
    expiresAt: new Date(data.expires_at).getTime()
  } : null;
};

export const deleteSession = async (token: string): Promise<void> => {
  await supabase
    .from('sessions')
    .delete()
    .eq('token', token);
};