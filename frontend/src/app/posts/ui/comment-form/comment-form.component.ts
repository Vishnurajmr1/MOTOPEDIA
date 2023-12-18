import { ChangeDetectionStrategy, Component, Input, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-comment-form',
  templateUrl: './comment-form.component.html',
  styleUrls: ['./comment-form.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CommentFormComponent {
@Input() submitLabel!:string;
@Input() hasCancelButton:boolean=false;
@Input() initalText:string='';

form!:FormGroup;

private fb=inject(FormBuilder);
ngOnInit(){
  this.form=this.fb.group({
    title:[this.initalText,Validators.required]
  })
}

onSubmit():void{
  console.log('onSubmit',this.form.value)
}
}
