import React,{ Component, createRef } from "react";
import './MousePostion.css'

export class MousePosition extends Component{
    
    constructor(props){
        super(props)

        this.state = {
            mouseX: 0,
            mouseY: 0,
            tailX: 0,
            tailY: 0,
        };

        //this.updatePosition = this.updatePosition.bind(this);
        //this.cursorMovment = this.cursorMovment.bind(this);

        this.cursor = createRef();
        this.cursorTrailing = createRef();
        this.animationFrame = null;
    } 

    componentDidMount() {
        document.addEventListener("mousemove", this.updatePosition);
        document.addEventListener("mouseenter", this.updatePosition);
        this.cursorMovment();
    }

    componentWillUnmount() { 
        document.removeEventListener("mousemove", this.updatePosition);
        document.removeEventListener("mouseenter", this.updatePosition);
        cancelAnimationFrame(this.animationFrame);
    }

    updatePosition = (evt) => {
        const { clientX, clientY } = evt;
        this.setState({
            mouseX: clientX,
            mouseY: clientY
        });
        
    }

    cursorMovment = () => {
        
        const { mouseX, mouseY, tailX, tailY } = this.state;
        const diffX = mouseX - tailX;
        const diffY = mouseY - tailY;

        this.setState({
            tailX: tailX + diffX / 10,
            tailY: tailY + diffY / 10,
        },
        () => {

            this.cursor.current.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
            this.cursorTrailing.current.style.transform = `translate3d(${tailX}px, ${tailY}px, 0)`;
            this.animationFrame = requestAnimationFrame(this.cursorMovment);
        });
    }

    render () {
        return(
            <div className="w3-container">
                <div className="cursors">
                    <div 
                        className="cursor"
                        ref={this.cursor}
                    />
                    <div 
                        className='cursor'
                        ref={this.cursorTrailing}
                    />
                </div>
            </div>
        );
    }
}