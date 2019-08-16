import { Component, OnInit } from '@angular/core';
import { PalantírService } from '../palantír.service';
import { JoomlaIDService } from '../joomla-id.service';
import { ThemingService } from '../theming.service';

@Component({
  selector: 'app-personal-banner',
  templateUrl: './personal-banner.component.html',
  styleUrls: ['./personal-banner.component.scss']
})
export class PersonalBannerComponent implements OnInit {
	
	characterID:any;
	characterInformation:any;
	characacterRank:string;
	characterName:string;
	characterFaction:string;
	idZeroWarning:string;
	eosICTime:any;
	time = new Date();

  constructor(private palantirService: PalantírService, private joomlaIDService: JoomlaIDService, private themingService: ThemingService) { }

  ngOnInit() {
		setInterval(() => {
       this.time = new Date();
    }, 1000);
		//this.icTime();
		this.resolveSession();
  }

	async icTime() {
		this.palantirService.getEosICTime().subscribe((result) => {
			this.eosICTime = result;
			console.log(this.eosICTime);
		});
	}


	async resolveSession() {
		this.joomlaIDService.resolveJoomlaID().subscribe((result) => {
			this.characterID = result;
			if (this.characterID == 0 || isNaN(this.characterID)) {
				this.idZeroWarning = ", it is unknown who you are. Customization is not available.";
				//this.characterID = 1;
			}
			if (!this.idZeroWarning) {
				this.characterPersonification();
			}
		});
	}


	async characterPersonification() {
		console.log(this.characterID);
		this.characterInformation = await this.palantirService.getPersonFromAPI(this.characterID);
		this.characacterRank = this.characterInformation.rank;
		this.characterName = this.characterInformation.character_name;
		this.characterFaction = this.characterInformation.faction;
		if (this.characterFaction) {
			this.themingService.setTheme(this.characterFaction);
			if (this.characterID == 131 || this.characterID == 1 || this.characterID == 133) {
				this.themingService.setTheme('seventh');
			}
		}
	}

}
