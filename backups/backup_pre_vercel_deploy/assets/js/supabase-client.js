// Cliente Supabase para frontend
import { createClient } from 'https://cdn.skypack.dev/@supabase/supabase-js'

const supabaseUrl = 'https://tvccuvzcmnrqtrakudju.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR2Y2N1dnpjbW5ycXRyYWt1ZGp1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTk2MzczNzQsImV4cCI6MjA3NTIxMzM3NH0.802UvU_k3qqyBQX_vRMiN7ofJy1wTKfZU1dk8UPybug'

export const supabase = createClient(supabaseUrl, supabaseKey)

// Funções para usar no frontend
export async function loginUser(email, password) {
  const { data, error } = await supabase
    .from('usuarios')
    .select('id, nome, email, criado_em')
    .eq('email', email)
    .eq('senha', password)
  
  if (error) throw error
  return data.length > 0 ? { success: true, user: data[0] } : { success: false }
}

export async function createUser(nome, email, senha) {
  const { data, error } = await supabase
    .from('usuarios')
    .insert([{ nome, email, senha }])
  
  if (error) throw error
  return { success: true }
}

export async function createAppointment(appointment) {
  const { data, error } = await supabase
    .from('agendamentos')
    .insert([appointment])
  
  if (error) throw error
  return { success: true }
}

export async function getUserAppointments(email) {
  const { data, error } = await supabase
    .from('agendamentos')
    .select('*')
    .eq('email', email)
    .order('data_agendamento', { ascending: true })
  
  if (error) throw error
  return data
}

export async function deleteAppointment(id) {
  const { error } = await supabase
    .from('agendamentos')
    .delete()
    .eq('id', id)
  
  if (error) throw error
  return { success: true }
}

export async function deleteUserAccount(email) {
  // Deletar agendamentos primeiro
  await supabase
    .from('agendamentos')
    .delete()
    .eq('email', email)
  
  // Deletar usuário
  const { error } = await supabase
    .from('usuarios')
    .delete()
    .eq('email', email)
  
  if (error) throw error
  return { success: true }
}