import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

export default DragDropContext(HTML5Backend);

// import React from 'react';
// import { DndProvider } from 'react-dnd';
// import HTML5Backend from 'react-dnd-html5-backend';

// export const withDragDropContext = Component => {
//   return props => (
//     <DndProvider backend={HTML5Backend}>
//       <Component {...props} />
//     </DndProvider>
//   );
// };
