import { Badge, Box, Flex, Text } from "@chakra-ui/react";
import { FaCheckCircle } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { Todo } from "./TodoList";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiUrl } from "../App";
import { Spinner } from "@chakra-ui/react";

const TodoItem = ({ todo }: { todo: Todo }) => {
  const queryClient = useQueryClient();
  const { mutate: updateTodo, isPending: isUpdating } = useMutation({
    mutationKey: ["updateTodo"],
    mutationFn: async () => {
      if (todo.completed) return alert("Todo already completed");
      try {
        const res = await fetch(`${apiUrl}/todos/${todo?._id}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (!res.ok) {
          throw new Error("Failed to update todo");
        }
        const data = await res.json();
        return data;
      } catch (error) {
        console.log(error);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });

  const { mutate: deleteTodo, isPending: isDeleting } = useMutation({
    mutationKey: ["deleteTodo"],
    mutationFn: async () => {
      try {
        const res = await fetch(`${apiUrl}/todos/${todo?._id}`, {
          method: "DELETE",
        });
        if (!res.ok) {
          throw new Error("Failed to delete todo");
        }
        const data = await res.json();
        return data;
      } catch (err) {
        console.log(err);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });

  return (
    <Flex gap={2} alignItems={"center"}>
      <Flex
        flex={1}
        alignItems={"center"}
        border={"1px"}
        borderColor={"gray.600"}
        p={2}
        borderRadius={"lg"}
        justifyContent={"space-between"}
      >
        <Text
          color={todo.completed ? "green.400" : "yellow.400"}
          textDecoration={todo.completed ? "line-through" : "none"}
          fontWeight={"bold"}
        >
          {todo.body}
        </Text>
        {todo.completed && (
          <Badge ml="1" colorScheme="green">
            Done
          </Badge>
        )}
        {!todo.completed && (
          <Badge ml="1" colorScheme="yellow">
            In Progress
          </Badge>
        )}
      </Flex>
      <Flex gap={2} alignItems={"center"}>
        <Box
          color={"green.500"}
          cursor={"pointer"}
          onClick={() => updateTodo()}
        >
          {isUpdating ? <Spinner size="sm" /> : <FaCheckCircle size={20} />}
        </Box>
        <Box color={"red.500"} cursor={"pointer"} onClick={() => deleteTodo()}>
          {isDeleting ? <Spinner size="sm" /> : <MdDelete size={25} />}
        </Box>
      </Flex>
    </Flex>
  );
};
export default TodoItem;
