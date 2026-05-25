-- Generate a level: picks a random target, builds the grid, stores the secret
create or replace function generate_level(count int)
returns json as $$
declare
  all_figures text[];
  target_fig text;
  other_figs text[];
  target_idx int;
  grid text[] := '{}';
  session_id uuid;
  i int;
begin
  -- Fetch all figures from the table
  select array_agg(figure) into all_figures from figures;

  -- Pick a random target figure
  target_fig := all_figures[1 + floor(random() * array_length(all_figures, 1))::int];

  -- Pick a random position in the grid for the target
  target_idx := floor(random() * count)::int;

  -- Build the rest with non-target figures
  other_figs := array_remove(all_figures, target_fig);
  for i in 0..count-1 loop
    if i = target_idx then
      grid := array_append(grid, target_fig);
    else
      grid := array_append(grid, other_figs[1 + floor(random() * array_length(other_figs, 1))::int]);
    end if;
  end loop;

  -- Store only the secret in game_sessions
  insert into game_sessions (target_index) values (target_idx) returning id into session_id;

  return json_build_object(
    'sessionId', session_id,
    'targetFigure', target_fig,
    'grid', grid
  );
end;
$$ language plpgsql security definer;


-- Validate a click: checks if the clicked index matches the stored target
create or replace function validate_click(session_id uuid, clicked_index int)
returns boolean as $$
declare
  sess game_sessions%rowtype;
begin
  select * into sess from game_sessions where id = session_id and used = false;
  if not found then return false; end if;

  -- Only mark as used if the answer is correct
  if clicked_index = sess.target_index then
    update game_sessions set used = true where id = session_id;
    return true;
  end if;

  return false;
end;
$$ language plpgsql security definer;