module.exports = [{
  "type": "section",
  "items": [
    {
      "type": "heading",
      "defaultValue": "Put your stuff in below"
    },
    {
      "type": "input",
      "appKey": "EDSMAPI",
	  "defaultValue": "",
      "label": "EDSM Api Key",
		"id": "EDSMAPI"
    },
	  {
		  "type": "input",
		  "appKey": "cmdrname",
		  "defaultValue": "",
		  "label": "Commander Name",
		  "id": "cmdrName"
	  },
    {
      "type": "toggle",
      "appKey": "enableAnimations",
      "label": "Enable Animations"
    },
	  {
  "type": "submit",
  "defaultValue": "Save"
}
  ]
}];