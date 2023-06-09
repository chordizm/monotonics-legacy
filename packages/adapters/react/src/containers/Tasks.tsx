import { useTasks } from "@/store";
import {  NavLink } from "@/components";

export const Tasks = (_: {}) => {
  const [tasks] = useTasks();
  return (
     <div>
        {tasks.map(({ id, name, mimeType }) => (
          <NavLink
            key={id}
            label={name}
            description={mimeType}
            
          />
        ))}
      </div>
   
  );
};
