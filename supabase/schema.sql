-- Create tables
create table figures (
  id serial primary key,
  figure text not null
);

insert into figures (figure) values
  ('rune'),
  ('😎'),('🤩'),('😂'),('😊'),('😄'),('😁'),('😆'),('😍'),('🥸');

create table game_sessions (
  id uuid primary key default gen_random_uuid(),
  target_index int not null,
  used boolean default false,
  created_at timestamptz default now()
);

-- Enable RLS
alter table figures enable row level security;
alter table game_sessions enable row level security;

-- Anyone can read figures
create policy "figures are public"
  on figures for select
  using (true);

-- Nobody can read game_sessions from the client
create policy "no client access to sessions"
  on game_sessions for all
  using (false);