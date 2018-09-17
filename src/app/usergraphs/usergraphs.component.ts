import { Component, OnInit, ViewEncapsulation, ViewChild, ElementRef} from '@angular/core';
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
    @ViewChild('forceDirectedChartContainer')
    private chartContainer: ElementRef;
    hostElement: any;

  constructor(
        private globals: Globals,
        private elementRef:ElementRef) {  }

    ngOnInit() {
      this.hostElement = this.chartContainer.nativeElement;
      console.log("element host width=",this.hostElement.offsetWidth);
      console.log("element host height=",this.hostElement.offsetHeight);
      console.log("element host =",this.hostElement);
      //let self = this;

      let width=this.hostElement.offsetWidth -70;
      let height=this.hostElement.offsetHeight -70;

      var zoom = d3.zoom()
         .scaleExtent([.2,10])
         .on("zoom",zoomed);

      let svg = d3.select(this.hostElement)
        .append('svg')
        .attr('width',width)
        .attr('height',height)
        .call(zoom)
        .append('g');


      var nodes=[];
      var links=[];
      var holdem=0;
      for (var i=0;i<this.globals.todos.length;i++) {
              nodes.push({"id":this.globals.todos[i].id, "userid":this.globals.todos[i].userId, "name":"To-do", "type":"todo"} );
              holdem++;
            };
      for (var i=0;i<this.globals.users.length;i++) {
        nodes.push({"id":this.globals.users[i].id+holdem,"userid":this.globals.users[i].id, "name":this.globals.users[i].name, "type":"user"});
        } 
      // OK, all the nodes have been pushed with hopefully unique IDs, match them up now

      for(var i=0;i<this.globals.todos.length;i++) {
         
        // for (var j=0;j< nodes.length;j++) {
        for (var j=0;j< nodes.length;j++) {
            // console.log("looking to test this.globals.todos[i].userId and nodes[j].name", this.globals.todos[i].userId,":",nodes[j].id)
            if(this.globals.todos[i].userId == nodes[j].userid) {
                //console.log("found match");
                // if (this.globals.todos[i].id != nodes[j].id ) {
                if (nodes[j].type!="todo") {
                    links.push(  { "source": this.globals.todos[i].id  , "target":nodes[j].id  } );
                  }
                
               } // end if
        }

          } // end outer for

       //console.log("after data setup;nodes=",nodes);
       //console.log("after data setup;links=",links);

      var simulation = d3.forceSimulation()
        //.force('link', d3.forceLink().id((d: any) => d.id))
        .force("link", d3.forceLink().id(function(d:any) {return d.id; }))
        .force('charge', d3.forceManyBody())
        .force('center', d3.forceCenter(width / 2, height / 2));


      var link = svg.append('g')
        .attr('class', 'links')
        .selectAll('line')
        .data(links)
        .enter()
        .append('line')
        .attr("stroke","gray")
        .attr("opacity",.5)
        .attr('stroke-width', "1px");

      var node = svg.append('g')
        .attr('class', 'nodes')
        .selectAll('circle')
        .data(nodes)
        .enter()
        .append('circle')
        .attr('r', function(d) {
          if (d.type == "user") 
            {return 10} else 
            {return 5}
        })
        .attr('fill', function(d) {
          //console.log("in node svg append;d=",d);
          if (d.type == "user") 
            {return "green"} else 
            {return "blue"}});

      var text=svg.append('g')
        .attr('class', 'labels')
        .selectAll('text')
        .data(nodes)
        .enter()
        .append("text")
        .attr('class','label')
        .text(function(d) { return d.name; });

      

      svg.selectAll('circle').call(d3.drag()
          .on('start', dragstarted)
          .on('drag', dragged)
          .on('end', dragended)
        );

      simulation.nodes(nodes).on('tick', ticked);
      //simulation.force("link").links(links);
      simulation.force<d3.ForceLink<any, any>>('link').links(links);


	  function ticked() {
		    link
          .attr('x1', function(d: any) { return d.source.x; })
          .attr('y1', function(d: any) { return d.source.y; })
          .attr('x2', function(d: any) { return d.target.x; })
          .attr('y2', function(d: any) { return d.target.y; });

        node
          .attr('cx', function(d: any) { return d.x; })
          .attr('cy', function(d: any) { return d.y; });

        text
          .attr('x', function(d: any) { return d.x -4; })
          .attr('y', function(d: any) { return d.y +15; });

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

    function zoomed() {
        svg.attr("transform", d3.event.transform);
      };

   }  // end nginit
} // end  export class UsergraphsComponent

