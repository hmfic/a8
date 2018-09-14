import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UsersComponent } from './users/users.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { DetailsComponent } from './details/details.component';
import { PostsComponent } from './posts/posts.component';
import { TodosComponent } from './todos/todos.component';
import { UsergraphsComponent } from './usergraphs/usergraphs.component';

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
	}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
