import { Component, OnInit } from '@angular/core';

import { GameService } from 'src/app/services/game.service'

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {

  constructor(
    public game:GameService
  ) { }

  ngOnInit(): void {
  }

}
