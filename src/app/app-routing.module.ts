import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UsersComponent } from './users/users.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { DetailsComponent } from './details/details.component';
import { PostsComponent } from './posts/posts.component';
import { TodosComponent } from './todos/todos.component';
import { UsergraphsComponent } from './usergraphs/usergraphs.component';
import { Sankey1Component } from './sankey1/sankey1.component';

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
		path:'usergraphs',
		component: UsergraphsComponent
	},
	{
		path:'sankey1',
		component: Sankey1Component
	}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
