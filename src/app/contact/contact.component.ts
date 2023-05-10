import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {
  
  dataDeHoje = new Date()

  ngOnInit(): void {
    this.form.statusChanges.subscribe(console.log)
    this.form.valueChanges.subscribe((value) => {
      console.log(value)
    })
  }

  form = new FormGroup({
    email: new FormControl('', [
      Validators.email,
      Validators.required,
      Validators.minLength(6)
    ])
  })

  onSubmit() {
    if (this.form.valid) {
      console.log(this.form)
    }
  }
}
