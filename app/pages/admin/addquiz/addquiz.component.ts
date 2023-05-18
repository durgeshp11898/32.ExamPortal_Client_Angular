import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CategoryServiceService } from 'src/app/services/category-service.service';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-addquiz',
  templateUrl: './addquiz.component.html',
  styleUrls: ['./addquiz.component.css']
})
export class AddquizComponent {
  color = 'accent';
  checked = false;

  categories: any[]=[];
  quizData={
    title:'',
    description:'',
    maxMarks:'',
    numberOfQuestions:'',
    active:true,
    category:{
      cid:''
    }
  }

  constructor(private _catergory_service:CategoryServiceService,private _snack:MatSnackBar
    ,private _quizService:QuizService){}

  ngOnInit():void{

    this._catergory_service.categories().subscribe(
      (data:any)=>{
        this.categories=data;
        console.log(this.categories)
      },
      (error)=>{
        Swal.fire("Error !!","Error,Loading data from Server","error")
      }
    )
  }

  //Add Quiz Function
  public addQuiz(){
    //Title Validation
    if(this.quizData.title.trim()=="" || this.quizData.title==null){
      this._snack.open("Title Required !",'OK',{
        duration:2000,
      })
      return
    }

    //Description validation
    if(this.quizData.description.trim()=="" || this.quizData.description==null){
      this._snack.open("description Required !",'OK',{
        duration:2000,
      })
      return
    }
    //Maximum Marks Field
    if(typeof this.quizData.maxMarks == 'number' || this.quizData.maxMarks==null){
      this._snack.open("MaxMarks Should be in Number  !",'OK',{
        duration:2000,
      })
      return
    }

    if(typeof this.quizData.numberOfQuestions == 'number' || this.quizData.numberOfQuestions==null){
      this._snack.open("numberOfQuestions Should be in Number  !",'OK',{
        duration:2000,
      })
      return
    }

    //Call Server
    this._quizService.addQuiz(this.quizData).subscribe(
      (data:any)=>{
        Swal.fire('Success !!',"Quiz added Successfully","success");
        this.quizData={
          title:'',
          description:'',
          maxMarks:'',
          numberOfQuestions:'',
          active:true,
          category:{
            cid:''
          }
        }
      },
      (error)=>{
        Swal.fire("Error","Error While Adding Quiz ",'error');
      }
    )

  }
}
