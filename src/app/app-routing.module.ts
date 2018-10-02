import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UsersComponent } from './users/users.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { DetailsComponent } from './details/details.component';
import { PostsComponent } from './posts/posts.component';
import { TodosComponent } from './todos/todos.component';
import { ForceComponent } from './force/force.component';
import { Sankey1Component } from './sankey1/sankey1.component';
import { GraphcentralComponent } from './graphcentral/graphcentral.component';

const routes: Routes = [
	{
		path:'',
		component: UsersComponent
	},
	{
		path:'users',
		component: UsersComponent
	},
	{
		path:'users/details/:id',
		component: DetailsComponent
	},
	{
		path:'details/:id',
		component: DetailsComponent
	},
	{
		path:'posts',
		component: PostsComponent
	},
	{
		path:'todos',
		component: TodosComponent
	},
	{
		path:'force',
		component: ForceComponent
	},
	{
		path:'graphcentral',
		component: GraphcentralComponent
	}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
