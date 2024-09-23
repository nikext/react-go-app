import { Button, Flex, Input, Spinner } from "@chakra-ui/react";
import { useState } from "react";
import { IoMdAdd } from "react-icons/io";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiUrl } from "../App";

const TodoForm = () => {
  const [newTodo, setNewTodo] = useState("");
  const queryClient = useQueryClient();
  const { mutate: createTodo, isPending } = useMutation({
    mutationKey: ["createTodo"],
    mutationFn: async (e: React.FormEvent) => {
      e.preventDefault();
      try {
        const res = await fetch(`${apiUrl}/todos`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ body: newTodo }),
        });
        if (!res.ok) {
          throw new Error("Failed to create todo");
        }
        const data = await res.json();
        return data;
      } catch (error) {
        console.log(error);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
      setNewTodo("");
    },
    onError: (error) => {
      alert(error.message);
    },
  });
  return (
    <form onSubmit={(e) => createTodo(e)}>
      <Flex gap={2}>
        <Input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          ref={(input) => input && input.focus()}
        />
        <Button
          mx={2}
          type="submit"
          _active={{
            transform: "scale(.97)",
          }}
        >
          {isPending ? <Spinner size={"xs"} /> : <IoMdAdd size={30} />}
        </Button>
      </Flex>
    </form>
  );
};
export default TodoForm;
