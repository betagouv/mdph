const ProfilePage = function() {
  this.beneficiaire = element(by.css('#beneficiaire .profile-category'));
  this.vieQuotidienne = element(by.css('#vieQuotidienne .profile-category'));
  this.documents = element(by.css('#documents .profile-category'));

  this.modifyVieQuotidienne = this.vieQuotidienne.element(by.buttonText('Modifier'));
  this.modifyDocuments = this.documents.element(by.buttonText('Modifier'));

  this.completedList = element.all(by.css('.profile-category.complete'));

  this.sendRequest = element(by.buttonText('Envoyer la demande'));
  this.statusTitle = element(by.css('.container-fluid > h2'));
};

module.exports = new ProfilePage();
