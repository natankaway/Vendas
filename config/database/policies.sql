-- Enable Row Level Security on all tables
ALTER TABLE empresas ENABLE ROW LEVEL SECURITY;
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE categorias ENABLE ROW LEVEL SECURITY;
ALTER TABLE produtos ENABLE ROW LEVEL SECURITY;
ALTER TABLE clientes ENABLE ROW LEVEL SECURITY;
ALTER TABLE vendas ENABLE ROW LEVEL SECURITY;
ALTER TABLE venda_itens ENABLE ROW LEVEL SECURITY;
ALTER TABLE estoque_movimentacoes ENABLE ROW LEVEL SECURITY;
ALTER TABLE audit_logs ENABLE ROW LEVEL SECURITY;

-- Helper function to get user's empresa_id
CREATE OR REPLACE FUNCTION get_user_empresa_id()
RETURNS UUID AS $$
BEGIN
  RETURN (
    SELECT empresa_id 
    FROM profiles 
    WHERE id = auth.uid()
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Helper function to check if user is admin
CREATE OR REPLACE FUNCTION is_user_admin()
RETURNS BOOLEAN AS $$
BEGIN
  RETURN (
    SELECT nivel = 'Administrador'
    FROM profiles 
    WHERE id = auth.uid()
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Policies for empresas table
CREATE POLICY "Users can view their own empresa" ON empresas
  FOR SELECT USING (
    id = get_user_empresa_id()
  );

CREATE POLICY "Admins can update their empresa" ON empresas
  FOR UPDATE USING (
    id = get_user_empresa_id() AND is_user_admin()
  );

-- Policies for profiles table
CREATE POLICY "Users can view profiles from their empresa" ON profiles
  FOR SELECT USING (
    empresa_id = get_user_empresa_id()
  );

CREATE POLICY "Users can update their own profile" ON profiles
  FOR UPDATE USING (
    id = auth.uid()
  );

CREATE POLICY "Admins can insert profiles in their empresa" ON profiles
  FOR INSERT WITH CHECK (
    empresa_id = get_user_empresa_id() AND is_user_admin()
  );

CREATE POLICY "Admins can update profiles in their empresa" ON profiles
  FOR UPDATE USING (
    empresa_id = get_user_empresa_id() AND is_user_admin()
  );

CREATE POLICY "Admins can delete profiles in their empresa" ON profiles
  FOR DELETE USING (
    empresa_id = get_user_empresa_id() AND is_user_admin() AND id != auth.uid()
  );

-- Policies for categorias table
CREATE POLICY "Users can view categorias from their empresa" ON categorias
  FOR SELECT USING (
    empresa_id = get_user_empresa_id()
  );

CREATE POLICY "Users can manage categorias in their empresa" ON categorias
  FOR ALL USING (
    empresa_id = get_user_empresa_id()
  );

-- Policies for produtos table
CREATE POLICY "Users can view produtos from their empresa" ON produtos
  FOR SELECT USING (
    empresa_id = get_user_empresa_id()
  );

CREATE POLICY "Users can manage produtos in their empresa" ON produtos
  FOR ALL USING (
    empresa_id = get_user_empresa_id()
  );

-- Policies for clientes table
CREATE POLICY "Users can view clientes from their empresa" ON clientes
  FOR SELECT USING (
    empresa_id = get_user_empresa_id()
  );

CREATE POLICY "Users can manage clientes in their empresa" ON clientes
  FOR ALL USING (
    empresa_id = get_user_empresa_id()
  );

-- Policies for vendas table
CREATE POLICY "Users can view vendas from their empresa" ON vendas
  FOR SELECT USING (
    empresa_id = get_user_empresa_id()
  );

CREATE POLICY "Users can create vendas in their empresa" ON vendas
  FOR INSERT WITH CHECK (
    empresa_id = get_user_empresa_id() AND vendedor_id = auth.uid()
  );

CREATE POLICY "Users can update their own vendas" ON vendas
  FOR UPDATE USING (
    empresa_id = get_user_empresa_id() AND 
    (vendedor_id = auth.uid() OR is_user_admin())
  );

CREATE POLICY "Admins can delete vendas in their empresa" ON vendas
  FOR DELETE USING (
    empresa_id = get_user_empresa_id() AND is_user_admin()
  );

-- Policies for venda_itens table
CREATE POLICY "Users can view venda_itens from their empresa" ON venda_itens
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM vendas 
      WHERE vendas.id = venda_itens.venda_id 
      AND vendas.empresa_id = get_user_empresa_id()
    )
  );

CREATE POLICY "Users can manage venda_itens from their vendas" ON venda_itens
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM vendas 
      WHERE vendas.id = venda_itens.venda_id 
      AND vendas.empresa_id = get_user_empresa_id()
      AND (vendas.vendedor_id = auth.uid() OR is_user_admin())
    )
  );

-- Policies for estoque_movimentacoes table
CREATE POLICY "Users can view estoque_movimentacoes from their empresa" ON estoque_movimentacoes
  FOR SELECT USING (
    empresa_id = get_user_empresa_id()
  );

CREATE POLICY "System can insert estoque_movimentacoes" ON estoque_movimentacoes
  FOR INSERT WITH CHECK (
    empresa_id = get_user_empresa_id()
  );

-- Policies for audit_logs table
CREATE POLICY "Admins can view audit_logs from their empresa" ON audit_logs
  FOR SELECT USING (
    empresa_id = get_user_empresa_id() AND is_user_admin()
  );

CREATE POLICY "System can insert audit_logs" ON audit_logs
  FOR INSERT WITH CHECK (
    empresa_id = get_user_empresa_id()
  );

-- Function to handle new user registration
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO profiles (id, nome, email, nivel)
  VALUES (
    NEW.id, 
    COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.email),
    NEW.email,
    'Funcionário'
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger for new user registration
CREATE OR REPLACE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();

-- Grant necessary permissions
GRANT USAGE ON SCHEMA public TO anon, authenticated;
GRANT ALL ON ALL TABLES IN SCHEMA public TO authenticated;
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO authenticated;