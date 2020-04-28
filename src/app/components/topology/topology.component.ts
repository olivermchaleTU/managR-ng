import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { BoardService } from 'src/app/services/board/board.service';
import Swal from 'sweetalert2';
import { BoardTopology } from 'src/app/utils/types/BoardTypes';
import { IconDefinition, faSpinner, faCaretDown, faCaretUp } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-topology',
  templateUrl: './topology.component.html',
  styleUrls: ['./topology.component.css']
})
export class TopologyComponent implements OnInit, OnDestroy {

  $routeParams: Subscription;
  $boardTopology: Subscription;
  id: string;
  topology: BoardTopology;
  loading = true;
  faSpinner: IconDefinition = faSpinner;
  faCaretDown: IconDefinition = faCaretDown;
  faCaretUp: IconDefinition = faCaretUp;
  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private boardService: BoardService
  ) { }

  ngOnInit() {
    this.$routeParams = this.activatedRoute.params.subscribe(params => {
      this.id = params.id;
      this.getBoardTopology();
    });
  }

  getBoardTopology() {
    this.boardService.getBoardTopology(this.id).subscribe(
      resp => this.handleTopologyResponse(resp),
      err => this.handleTopologyError(err)
    );
  }

  handleTopologyResponse(resp: BoardTopology) {
    this.topology = resp;
    this.loading = false;
  }

  handleTopologyError(err) {
    this.loading = false;
    console.error(err);
    Swal.fire({
      title: 'Error',
      text: 'Failed to get agile board topology' + err,
      icon: 'error',
      confirmButtonText: 'Ok',
    }).then((clicked) => {
      this.router.navigate(['/board']);
    });
  }

  ngOnDestroy(): void {
    if (this.$routeParams) {
      this.$routeParams.unsubscribe();
    }
    if (this.$boardTopology) {
      this.$boardTopology.unsubscribe();
    }
  }

}
