'use strict';

customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">QuickReserve Frontend</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                                <li class="link">
                                    <a href="overview.html" data-type="chapter-link">
                                        <span class="icon ion-ios-keypad"></span>Overview
                                    </a>
                                </li>

                            <li class="link">
                                <a href="index.html" data-type="chapter-link">
                                    <span class="icon ion-ios-paper"></span>
                                        README
                                </a>
                            </li>
                                <li class="link">
                                    <a href="dependencies.html" data-type="chapter-link">
                                        <span class="icon ion-ios-list"></span>Dependencies
                                    </a>
                                </li>
                                <li class="link">
                                    <a href="properties.html" data-type="chapter-link">
                                        <span class="icon ion-ios-apps"></span>Properties
                                    </a>
                                </li>

                    </ul>
                </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#components-links"' :
                            'data-bs-target="#xs-components-links"' }>
                            <span class="icon ion-md-cog"></span>
                            <span>Components</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="components-links"' : 'id="xs-components-links"' }>
                            <li class="link">
                                <a href="components/AppComponent.html" data-type="entity-link" >AppComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/AppointmentCardComponent.html" data-type="entity-link" >AppointmentCardComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/AppointmentErrorComponent.html" data-type="entity-link" >AppointmentErrorComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/AppointmentsComponent.html" data-type="entity-link" >AppointmentsComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/AppointmentSuccessComponent.html" data-type="entity-link" >AppointmentSuccessComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/ContactStepComponent.html" data-type="entity-link" >ContactStepComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/DatePickerComponent.html" data-type="entity-link" >DatePickerComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/ErrorDetailRowComponent.html" data-type="entity-link" >ErrorDetailRowComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/ErrorIconComponent.html" data-type="entity-link" >ErrorIconComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/FilterDropdownComponent.html" data-type="entity-link" >FilterDropdownComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/FiltersBarComponent.html" data-type="entity-link" >FiltersBarComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/LanguageSelectorComponent.html" data-type="entity-link" >LanguageSelectorComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/LoadingButtonComponent.html" data-type="entity-link" >LoadingButtonComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/NavbarComponent.html" data-type="entity-link" >NavbarComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/NewAppointmentComponent.html" data-type="entity-link" >NewAppointmentComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/ProgressBarComponent.html" data-type="entity-link" >ProgressBarComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/SearchInputComponent.html" data-type="entity-link" >SearchInputComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/ServiceStepComponent.html" data-type="entity-link" >ServiceStepComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/StatCardComponent.html" data-type="entity-link" >StatCardComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/SuccessIconComponent.html" data-type="entity-link" >SuccessIconComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/SummaryRowComponent.html" data-type="entity-link" >SummaryRowComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/ThemeSelectorComponent.html" data-type="entity-link" >ThemeSelectorComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/TimeSlotPickerComponent.html" data-type="entity-link" >TimeSlotPickerComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/VehicleStepComponent.html" data-type="entity-link" >VehicleStepComponent</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#classes-links"' :
                            'data-bs-target="#xs-classes-links"' }>
                            <span class="icon ion-ios-paper"></span>
                            <span>Classes</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"' }>
                            <li class="link">
                                <a href="classes/AppointmentPort.html" data-type="entity-link" >AppointmentPort</a>
                            </li>
                            <li class="link">
                                <a href="classes/AppointmentValidationError.html" data-type="entity-link" >AppointmentValidationError</a>
                            </li>
                            <li class="link">
                                <a href="classes/StoragePort.html" data-type="entity-link" >StoragePort</a>
                            </li>
                            <li class="link">
                                <a href="classes/WorkshopPort.html" data-type="entity-link" >WorkshopPort</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#injectables-links"' :
                                'data-bs-target="#xs-injectables-links"' }>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>Injectables</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                                <li class="link">
                                    <a href="injectables/AppointmentHttpAdapter.html" data-type="entity-link" >AppointmentHttpAdapter</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/AppointmentsState.html" data-type="entity-link" >AppointmentsState</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/CreateAppointmentUseCase.html" data-type="entity-link" >CreateAppointmentUseCase</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/FilterAppointmentsUseCase.html" data-type="entity-link" >FilterAppointmentsUseCase</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/GetAppointmentsUseCase.html" data-type="entity-link" >GetAppointmentsUseCase</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/GetOccupiedSlotsUseCase.html" data-type="entity-link" >GetOccupiedSlotsUseCase</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/GetWorkshopsUseCase.html" data-type="entity-link" >GetWorkshopsUseCase</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/LocalStorageAdapter.html" data-type="entity-link" >LocalStorageAdapter</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ThemeAdapter.html" data-type="entity-link" >ThemeAdapter</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ThemeState.html" data-type="entity-link" >ThemeState</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/WorkshopHttpAdapter.html" data-type="entity-link" >WorkshopHttpAdapter</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/WorkshopsState.html" data-type="entity-link" >WorkshopsState</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#interfaces-links"' :
                            'data-bs-target="#xs-interfaces-links"' }>
                            <span class="icon ion-md-information-circle-outline"></span>
                            <span>Interfaces</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? ' id="interfaces-links"' : 'id="xs-interfaces-links"' }>
                            <li class="link">
                                <a href="interfaces/ApiResponse.html" data-type="entity-link" >ApiResponse</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Appointment.html" data-type="entity-link" >Appointment</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/AppointmentApiDto.html" data-type="entity-link" >AppointmentApiDto</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/AppointmentErrorState.html" data-type="entity-link" >AppointmentErrorState</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/AppointmentFilters.html" data-type="entity-link" >AppointmentFilters</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/CalendarDay.html" data-type="entity-link" >CalendarDay</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Contact.html" data-type="entity-link" >Contact</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/CreateAppointmentApiDto.html" data-type="entity-link" >CreateAppointmentApiDto</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/CreateAppointmentDto.html" data-type="entity-link" >CreateAppointmentDto</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/TimeSlot.html" data-type="entity-link" >TimeSlot</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ValidationError.html" data-type="entity-link" >ValidationError</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Vehicle.html" data-type="entity-link" >Vehicle</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Workshop.html" data-type="entity-link" >Workshop</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/WorkshopApiDto.html" data-type="entity-link" >WorkshopApiDto</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#miscellaneous-links"'
                            : 'data-bs-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/enumerations.html" data-type="entity-link">Enums</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/functions.html" data-type="entity-link">Functions</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/typealiases.html" data-type="entity-link">Type aliases</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <a data-type="chapter-link" href="routes.html"><span class="icon ion-ios-git-branch"></span>Routes</a>
                        </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});