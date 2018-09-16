import { Component, OnInit, ViewEncapsulation} from '@angular/core';
import * as d3 from 'd3';
// import { D3Service, D3, Selection } from 'd3-ng2-service';
import { Globals } from "../globals";

//import {ForceLink} from 'd3-ng2-service';

@Component({
  selector: 'app-usergraphs',
  templateUrl: './usergraphs.component.html',
  styleUrls: ['./usergraphs.component.scss'],
  encapsulation: ViewEncapsulation.None
})

  export class UsergraphsComponent implements OnInit {
    // private d3: D3; // <-- Define the private member which will hold the d3 reference
    //private parentNativeElement: any;
    //private d3Svg: Selection<SVGSVGElement, any, null, undefined>;

  constructor(
        private globals: Globals) { 
    //this.d3 = d3Service.getD3(); // <-- obtain the d3 object from the D3 Service
    //this.parentNativeElement = element.nativeElement;
    }

    ngOnInit() {
      //let self = this;
      //let d3 = this.d3; // <-- for convenience use a block scope variable
      let svg = d3.select('svg');
      let height=+svg.attr('width');
      let width=+svg.attr('width');
      //let d3ParentElement: Selection<HTMLElement, any, null, undefined>;
      //let d3ParentElement: Selection<any, any, any, any>;
      //let d3Svg: Selection<SVGSVGElement, any, null, undefined>;
      var nodes= [
              {'id': 'Alice'},
              {'id': 'Bob'},
              {'id': 'Cathy'}
            ];
      var links=[
              {'source': 'Alice', 'target': 'Bob'},
              {'source': 'Bob', 'target': 'Cathy'},
              {'source': 'Cathy', 'target': 'Alice'},
            ];

          console.log("height:width",height,":",width);

          // const color = d3.scaleOrdinal(d3.schemeCategory20);

          var simulation = d3.forceSimulation()
            //.force('link', d3.forceLink().id((d: any) => d.id))
            .force("link", d3.forceLink().id(function(d:any) { console.log("in forcelink;d.id=",d.id);return d.id; }))
            .force('charge', d3.forceManyBody());
            ///.force('center', d3.forceCenter([width / 2, height / 2)]);

          var link = svg.append('g')
            .attr('class', 'links')
            .selectAll('line')
            .data(links)
            .enter()
            .append('line')
            .attr("stroke","red")
            .attr('stroke-width', "1px");

          var node = svg.append('g')
            .attr('class', 'nodes')
            .selectAll('circle')
            .data(nodes)
            .enter()
            .append('circle')
            .attr('r', 5)
            .attr('fill', "green");

          node.append("title")
              .text(function(d) { return d.id; });

          svg.selectAll('circle').call(d3.drag()
              .on('start', dragstarted)
              .on('drag', dragged)
              .on('end', dragended)
            );

          simulation.nodes(nodes).on('tick', ticked);
          //simulation.force("link").links(links);
          simulation.force<d3.ForceLink<any, any>>('link').links(links);
      //} // end if parentelement != null



	  function ticked() {
		    link
          .attr('x1', function(d: any) { return d.source.x; })
          .attr('y1', function(d: any) { return d.source.y; })
          .attr('x2', function(d: any) { return d.target.x; })
          .attr('y2', function(d: any) { return d.target.y; });

        node
          .attr('cx', function(d: any) { return d.x; })
          .attr('cy', function(d: any) { return d.y; });
		  } // end ticked


    function dragstarted(d) {
          if (!d3.event.active) { simulation.alphaTarget(0.3).restart(); }
          d.fx = d.x;
          d.fy = d.y;
        }

        function dragged(d) {
          d.fx = d3.event.x;
          d.fy = d3.event.y;
        }

        function dragended(d) {
          if (!d3.event.active) { simulation.alphaTarget(0); }
          d.fx = null;
          d.fy = null;
        }

   }  // end nginit
} // end  export class UsergraphsComponent


 //console.log('D3.js version:', d3['version']);
      // this.mydata={nodes:[],links:[]};
      // push all the links onto the stack
 /*     for (var i=0;i<this.globals.todos.length;i++) {
        this.mydata.nodes.push({"id":this.globals.todos[i].userId,"name":this.globals.todos[i].title } );
      };
      for (var i=0;i<this.globals.users.length;i++) {
        // push the user once, then loop through the todos for the users assigned todos
        this.mydata.nodes.push({"id":this.globals.users[i].id,"name":this.globals.users[i].name});
        // go back and look thru the todos for the user
        for(var j=0;j<this.globals.todos.length;j++) {
          //console.log("before check; this.globals.todos[j].userId : this.globals.users[i].id",this.globals.todos[j].userId,":",this.globals.users[i].id)
          if(this.globals.todos[j].userId == this.globals.users[i].id) {
            //console.log("found match");
            this.mydata.links.push(  { "source":{ "id":this.globals.todos[j].id  }  ,  "target":{ "id":this.globals.todos[j].userId } } );
            }
          
          }
        }; */
