-- Create todos table
CREATE TABLE todos (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  completed BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW())
);

-- Create index on created_at for faster queries
CREATE INDEX idx_todos_created_at ON todos(created_at DESC);

-- Create index on completed for filtering
CREATE INDEX idx_todos_completed ON todos(completed);

-- Enable RLS (Row Level Security)
ALTER TABLE todos ENABLE ROW LEVEL SECURITY;

-- Create policy to allow anonymous access for now
-- In production, you should implement proper authentication
CREATE POLICY "Allow public access" ON todos
  FOR SELECT USING (true);

CREATE POLICY "Allow public insert" ON todos
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow public update" ON todos
  FOR UPDATE USING (true);

CREATE POLICY "Allow public delete" ON todos
  FOR DELETE USING (true);
