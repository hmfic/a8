import { Component, OnInit, AfterViewInit, ViewEncapsulation, ViewChild, ElementRef, Input } from '@angular/core';
import * as d3 from 'd3';
import * as d3Sankey from 'd3-sankey';
import { Globals } from "../globals";
// import { Event } from './classes/event';

@Component({
  selector: 'app-sankey1',
  templateUrl: './sankey1.component.html',
  styleUrls: ['./sankey1.component.scss'],
  encapsulation: ViewEncapsulation.None

})

export class Sankey1Component implements OnInit, AfterViewInit {
	@ViewChild('sankey1ChartContainer') chartContainer: ElementRef;
    hostElement: any;
    width:number;
    height:number;
    //hoverName:string;
    graph: any;
    //@Input() data:any;
    margin:any = {top: 0, right: 20, bottom: 20, left: 20}
    // @Input() event: Event;

  constructor(
  	private globals: Globals,
    private elementRef:ElementRef

    ) { }

  ngAfterViewInit() {
      //console.log("sankey1; after view element host height=",this.chartContainer.nativeElement.offsetHeight);
      //console.log("sankey1; data=",this.data);
      this.width=this.chartContainer.nativeElement.offsetWidth;
      this.height=this.chartContainer.nativeElement.offsetHeight - this.margin.bottom;
      //this.data="";
      this.DrawChart();
    }

  //ngOnChanges(changes: SimpleChanges) {
  //    if (typeof this.data==="undefined") return;
  //    console.log("in sankey1; ngonchanges;data=",this.data);
  //    this.hoverName=this.data.title;
    // changes.prop contains the old and the new value...
  //}

  ngOnInit () {
  	this.hostElement = this.chartContainer.nativeElement;
    //this.DrawChart();
  }
// his.chartContainer.nativeElement.offsetWidth
  private DrawChart() {
  	this.width=this.chartContainer.nativeElement.offsetWidth -50;
    //this.height=this.chartContainer.nativeElement.offsetHeight -30;
    if (this.chartContainer.nativeElement.offsetHeight <= 1 ) {
        this.height=500;
    } else this.height=this.chartContainer.nativeElement.offsetHeight -50;

    var formatNumber = d3.format(",.0f"),
    color = d3.scaleOrdinal(d3.schemeCategory10);

    //console.log("in drawchart; sankey1; width:height",this.width,":",this.height);
    //console.log("in drawchart; sankey1; this.data=",this.data);

    let svg = d3.select(this.hostElement)
        .append('svg')
        .attr('width',"100%")
        //.attr('height',"100vh")
        //.attr('width',this.width)
        .attr('height',this.height)
        //.attr('style',"margin-bottom:70px;")
        .append('g')

        .attr("transform", 
          "translate(" + this.margin.left + "," + this.margin.top + ")");;

    svg.append("g")
        .append("text")
        .attr("x", this.width*.5)
        .attr("y", 30)
        .attr("stroke", "black")
        .attr("stroke-width", 0)
        .attr('text-anchor','middle')
        .attr("opacity", ".1")
        .attr('font-size', "2em" )
        //.style("position","absolute")
        .text(function(d){
            return 'Single User Todos '}); 

    // var sankey = d3.sankey()
    var sankey = d3Sankey.sankey()
        .nodeWidth(15)
        .nodePadding(5)
        .extent([[10, 40], [this.width - 100, this.height - 25]]);
        //.extent([[1, 1], [this.width - 100, this.height - 20]]);

    var link = svg.append("g")
        .attr("class", "links")
        .attr("fill", "none")
        .attr("stroke", "#000")
        .attr("stroke-opacity", 0.2)
        .selectAll("path");

    var node = svg.append("g")
        .attr("class", "nodes")
        .attr("font-family", "sans-serif")
        .attr("font-size", 10)
        .selectAll("g");

    var div = d3.select("body").append("div")
        .attr("class", "tooltipsankey") 
        .style("opacity", 0);

    const energy:DAG = {
            nodes: [{
                nodeId: 0,
                name: this.globals.users[0].name,
                completed: true
            }],
            links: []
        };
        
    for(var i=0;i<this.globals.todos.length;i++) {
    	if(this.globals.todos[i].userId==1) {
    		energy.nodes.push({nodeId:i+1,"name":this.globals.todos[i].title,"completed":this.globals.todos[i].completed})
    	}
    }
    for(var i=0;i<energy.nodes.length-1;i++) {
    	energy.links.push({"source":0,"target":i+1,"value":energy.nodes[i+1].name.length})
    }
    // console.log("energy=",energy);
    var graph = sankey(energy);

    link = link
        .data(energy.links)
        .enter()
        .append("path")
        .attr("class", "linksankey")
        .attr("d", d3Sankey.sankeyLinkHorizontal())
        /* .style("stroke",
            function (d:any) {
                console.log("in stroke link;test=x:y",d.target.name,":",this.hoverName);
                
                if(d.target.name == this.hoverName) {
                        return "red"
                    } else {
                        return "blue"
                    }
            }) */
        .attr("stroke-width", function (d: any) { return Math.max(1, d.width); })

    link.on("mouseover", function(d) {    
            // console.log("on hover;d=",d);  
            div.transition()        
                .duration(200)      
                .style("opacity", .9);      
            div .html("<b>" + d['source'].name + "\ → "  + d['target'].name + " value is " + d['value'])  
                .style("left", (d3.event.pageX) + "px")     
                .style("top", (d3.event.pageY - 28) + "px");    
            })                  
        .on("mouseout", function(d) {       
            div.transition()        
                .duration(500)      
                .style("opacity", 0);   
        });

    link.append("title")
        .text(function (d: any) { return d.source.name + " → Todo #" + d.target.index});

    node = node
        .data(energy.nodes)
        .enter().append("g")

        .call(d3.drag()
            .subject(function(d){return d})
            .on('start', function () { this.parentNode.appendChild(this); })
            .on('drag', dragmove));


    node.append("rect")
        .attr("x", function (d: any) { return d.x0; })
        .attr("y", function (d: any) { return d.y0; })
        .attr("stroke-width","0")
        .attr("height", function (d: any) { return d.y1 - d.y0; })
        .attr("width", function (d: any) { return d.x1 - d.x0; })
        .attr("fill", function (d: any) { 
            //console.log("rect hover; data=",this.data);

            if(d.completed == true) {
                return "green"
            } else 
            {return  "orange"}})
        .attr("stroke", "#888");

    node.append("text")
        .attr("x", function (d: any) { return d.x0 +15; })
        .attr("y", function (d: any) { return (d.y1 + d.y0) / 2; })
        .attr("dy", "0.35em")
        .attr("text-anchor", "start")
        .text(function (d: any) { 
        	if(d.index == 0) {
        		return d.name
        	} else
        	return "Todo # " + d.index; })
        //.filter(function (d: any) { return d.x0 < this.width / 2; })
        .attr("x", function (d: any) { return d.x1 + 3; })
        .attr("text-anchor", "start");

    function dragmove(d) {
          var rectY = d3.select(this).select("rect").attr("y");
          d.y0 = d.y0 + d3.event.dy;
          var yTranslate = d.y0 - rectY;

          var rectX = d3.select(this).select("rect").attr("x");
          d.x0 = d.x0 + d3.event.dx;
          var xTranslate = d.x0 - rectX;
          d3.select(this).attr("transform","translate("+ [xTranslate,yTranslate] + ")"); 
          //console.log("graph=",graph); 
          sankey.update(graph);
          link.attr("d",d3Sankey.sankeyLinkHorizontal());
        }


  }
}



interface SNodeExtra {
    nodeId: number;
    name: string;
    completed: boolean;
}

interface SLinkExtra {
    source: number;
    target: number;
    value: number;
}
type SNode = d3Sankey.SankeyNode<SNodeExtra, SLinkExtra>;
type SLink = d3Sankey.SankeyLink<SNodeExtra, SLinkExtra>;

interface DAG {
    nodes: SNode[];
    links: SLink[];
}
