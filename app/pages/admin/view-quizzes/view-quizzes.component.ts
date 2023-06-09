import { Component } from '@angular/core';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-quizzes',
  templateUrl: './view-quizzes.component.html',
  styleUrls: ['./view-quizzes.component.css']
})
export class ViewQuizzesComponent {

  quizzes: any[]=[];


  constructor(private quizService:QuizService){}

  ngOnInit():void{

    this.quizService.quizzes().subscribe(
      (data:any)=>{
        this.quizzes=data;
        console.log(this.quizzes);
      },
      (error:any)=>{
        Swal.fire('Error !','Error in loading data from Server','error');
      }
      )   
  }

  //Delete Quiz 
  public deleteQuiz(qid:any){
    this.quizService.deleteQuiz(qid).subscribe(
      (data:any)=>{
        this.quizzes= this.quizzes.filter((quiz)=>quiz.qId != qid);
        Swal.fire('Success !','Quiz Deleted Successfully','success');
      },
      (error:any)=>{
        Swal.fire('Error !','Quiz Not Deleted','error');
      }
      )   
  }
}
