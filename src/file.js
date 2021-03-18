import Example from './DragElement'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { DndProvider } from 'react-dnd'
import { useDrag ,useDrop} from 'react-dnd'

// let styleCardNum= {
//     width:'50px',
//     height:'50px',
//     background:'rgba(25,25,25,0.5)',
//     margin:'10px',
//     display:'flex',
//     justifyContent:'center',
//     alignItems: 'center',
//     cursor:'grabbing'
// }

// let Card = ({children})=> {
//   let [{background}, dragref] = useDrag(() => ({
//     type:'condition',
//     item: { type:'condition' , value: children },
//     collect: (monitor)=> ({
//       background: monitor.isDragging() ? 'rgba(25,235, 56, 0.8)' : 'rgba(25,0, 56, 0.8)'
//     })
//   }))
//   return <div style={{...styleCardNum , background}}ref={dragref} >{ children }</div>
  
// }



// let Aria = ({handelElement , elementns})=> {

//     let [{canDrop , isOver}, drop] = useDrop(() => ({
//       accept: 'condition',
//       drop:(item)=> {
//         handelElement(item)
//       },
//       collect:(monitor)=> ({
//         isOver: !!monitor.isOver(),
//         canDrop: monitor.canDrop()
//       })
//     }))
  
//     return <div ref={drop} style={{flexBasis:'100%' , height:'50vh',border:'1px solid #f00'}}> {
//         elementns.length === 0 ? null :  elementns.map(el=> {
//           console.log(el)
//           return <Card >{el.value}</Card>
//         })
      
//     }</div>
  
// }


function App() {
    let [state, setState] = React.useState([]);
 
    function handelElement (ele) {
      setState((prev)=> {
        
         return [...prev , ele ]
      })
    }
   
   return (
       //  <div className="App " style={{display:'flex'}}>
       //      <DndProvider backend={HTML5Backend}>
       //           <div className="card-number">
       //             {Array(5).fill(0).map((el , i ) => {
       //               return <Card key={el + i } >{  1 + i }</Card>
       //             })}
       //           </div>
       //            <div className="land-of-element" style={{flexBasis:'100%'}}> 
       //              <Aria  handelElement={handelElement} elementns={state}/> 
       //            </div> 
       //      </DndProvider>  
       //   </div>  
            <AppUi/>
   )
 }