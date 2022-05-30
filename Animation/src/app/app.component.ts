import { animate, keyframes, state, style, transition, trigger } from '@angular/animations';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  animations:[
    trigger('divState',[
      state('normal',style({
        backgroundColor:'red',
        transform:'translatex(0)'
      })),
      state('highlighted',style({
        backgroundColor:'blue',
        transform:'translatex(100px) scale(1)'
      })),
      transition('normal <=>highlighted',animate(300))
     ]),
    trigger('wildState',[
      state('normal',style({
          backgroundColor:'red',
          transform:'translatex(0) scale(1)'
        })),
        state('highlighted',style({
          backgroundColor:'blue',
          transform:'translatex(100px) scale(1)'
        })),
        state('shrunk',style({
          backgroundColor:'green',
          transform:'translatex(0px) scale(0.5)'
        })),
        transition('normal <=>highlighted',animate(300)),
        transition('shrunk <=>*',animate(300))
    ]),
    trigger('list1',[
      state('in',style({
        opacity:1,
        transform:'translateX(0)'
      })),
      transition('void=>*',[
       style({
          opacity:0,
          transform:'translateX(-100px)'
        }),
        animate(300)
    ]),
      transition('* =>void',[
        animate(300,style({
          transform:'translateX(100px)',
          opacity:0
        })
      )
    ])
  ]),
  trigger('list2',[
    state('in',style({
      opacity:1,
      transform:'translateX(0)'
    })),
    transition('void=>*',[
      animate(1000,keyframes([
        style({
          transform:'translateX(-100px)',
          opacity:0,
        }),
        style({
          transform:'translateX(-50px)',
          opacity:0.5,
        }),
        style({
          transform:'translateX(-20px)',
          opacity:1,
        })

      ]))
  ]),
    transition('* =>void',[
      animate(300,style({
        transform:'translateX(100px)',
        opacity:0
      })
    )
  ])
])

]
  })
export class AppComponent {
  state='normal';
  wildState='normal'
  list = ['Milk', 'Sugar', 'Bread'];

    onAdd(item) {
      this.list.push(item);
    }
    onDelete(item)
    {
      this.list.splice(this.list.indexOf(item),1);
    }
    onAnimate()
    {
      this.state=this.state==='normal'?'highlighted':'normal'
      this.wildState=this.wildState==='normal'?'highlighted':'normal'
    }
    onShrunk()
    {
       this.wildState='shrunk'
    } 


  
}
