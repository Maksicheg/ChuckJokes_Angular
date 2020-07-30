import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ImageModel } from './../../../../shared/models/image.model';
import {
  CategoryModel,
  JokeModel,
} from './../../../../shared/models/joke.model';
import { JokesService } from './../../../../shared/services/jokes.service';

@Component({
  selector: 'app-modify-joke-form',
  templateUrl: './modify-joke-form.component.html',
  styleUrls: ['./modify-joke-form.component.scss'],
})
export class ModifyJokeFormComponent implements OnInit {
  @Input() updateJokeMode: boolean;
  @Output() submitForm = new EventEmitter<JokeModel>();
  @Input()
  get joke(): JokeModel {
    return this.jokeModel;
  }
  set joke(joke: JokeModel) {
    this.jokeModel = joke;
    if (this.jokeModel && this.jokeModel.id) {
      this.form.patchValue(this.jokeModel);
    }
  }

  public jokeModel: JokeModel;
  public form: FormGroup;
  public categories: CategoryModel[];
  public fileList: FileList;
  public panelOpenState = false;
  private imagesData = [];

  constructor(
    private formBuilder: FormBuilder,
    private jokesService: JokesService
  ) {}

  ngOnInit(): void {
    this._getCategories();
    this._initForm(this.jokeModel);
  }

  private _getCategories(): void {
    this.jokesService
      .getCategories()
      .subscribe((categories: CategoryModel[]) => {
        this.categories = categories;
        this.jokesService.changeCategories(categories);
      });
  }

  private _initForm(joke: JokeModel): void {
    this.form = this.formBuilder.group({
      value: [joke.value, [Validators.required, Validators.minLength(3)]],
      imageNames: [joke.imageNames],
      categories: [
        joke.categories
          ? joke.categories.map((category) => category.title)
          : null,
      ],
    });
    if (this.updateJokeMode) {
      const idControl = new FormControl({ value: joke.id, disabled: true }, [
        Validators.required,
        Validators.min(1),
      ]);
      this.form.addControl('id', idControl);
    }
  }

  public onSubmit(): void {
    if (this.form.valid) {
      const data = {
        ...this.form.getRawValue(),
        imagesData: this.imagesData,
      };
      this.submitForm.emit(data);
    }
  }

  public onChange(fileList: FileList): void {
    this.fileList = fileList;
    Array.from(fileList).map((file: File) => {
      const fileExtension = file.name.split('.').pop();
      this.jokesService
        .getImageUrl(fileExtension)
        .subscribe((imageData: ImageModel) =>
          this.imagesData.push({ imageData, file })
        );
    });
  }
}
