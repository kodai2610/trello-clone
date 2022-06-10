import React from 'react';
import { Droppable } from 'react-beautiful-dnd';
import { DragDropContext } from 'react-beautiful-dnd';
import { Task } from './Task';

const reorder = (taskList, startIndex, endIndex) => {
	const remove = taskList.splice(startIndex, 1); //削除
	taskList.splice(endIndex, 0, remove[0]); //追加
};

export const Tasks = ({ taskList, setTaskList }) => {
	const handleDragEnd = (result) => {
		reorder(taskList, result.source.index, result.destination.index);
		setTaskList(taskList);
	};

	return (
		<div>
			<DragDropContext onDragEnd={handleDragEnd}>
				<Droppable droppableId='droppable'>
					{(provided) => (
						<div {...provided.droppableProps} ref={provided.innerRef}>
							{taskList.map((task, index) => (
								<Task
									index={index}
									key={task.id}
									task={task}
									taskList={taskList}
									setTaskList={setTaskList}
								/>
							))}
							{provided.placeholder}
						</div>
					)}
				</Droppable>
			</DragDropContext>
		</div>
	);
};
