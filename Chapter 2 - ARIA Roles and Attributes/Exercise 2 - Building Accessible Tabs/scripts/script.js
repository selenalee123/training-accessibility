class TabComponent {
    constructor(tabNodes) {
        this.tabs = Array.from(tabNodes.querySelectorAll('[role=tab]'));
        this.firstTab = null;
        this.lastTab = null;

        this.tabs.forEach(tab => {

            tab.tabIndex = -1;
            tab.setAttribute('aria-selected', 'false');


            tab.addEventListener('keydown', this.handleKeyDown.bind(this));
            tab.addEventListener('click', this.handleTabClick.bind(this));

            if (!this.firstTab) {
                this.firstTab = tab;
            }
            this.lastTab = tab;
        });

        this.setActiveTab(this.firstTab);
    }

    setActiveTab(selectedTab) {
        this.tabs.forEach(tab => {
            const tabControl = tab.getAttribute('aria-controls');
            const tabPanel = document.getElementById(tabControl);
            if(tab === selectedTab) {
                tab.setAttribute('aria-selected', 'true');
                tab.removeAttribute('tabIndex');
                tabPanel.classList.add('active');
            }else {
                tab.setAttribute('aria-selected', 'false');
                tab.tabIndex = -1
                tabPanel.classList.remove('active');
            }
        })
    }

    handleTabClick(event) {
        this.setActiveTab(event.currentTarget);
    }

    handleKeyDown(event) {
        const targetTab = event.currentTarget;
        let preventDefault = false;

        switch (event.key) {
            case 'ArrowLeft':
                this.moveFocusToPreviousTab(targetTab);
                preventDefault = true;
                break;

            case 'ArrowRight':
                this.moveFocusToNextTab(targetTab);
                preventDefault = true;
                break;

            case 'Home':
                this.moveFocusToTab(this.firstTab);
                preventDefault = true;
                break;

            case 'End':
                this.moveFocusToTab(this.lastTab);
                preventDefault = true;
                break;

            default:
                break;
        }

        if (preventDefault) {
            event.stopPropagation();
            event.preventDefault();
        }
    }

    moveFocusToPreviousTab(currentTab) {
        if (currentTab === this.firstTab) {
            this.moveFocusToTab(this.lastTab);
        } else {
            const index = this.tabs.indexOf(currentTab);
            this.moveFocusToTab(this.tabs[index - 1]);
        }
    }

    moveFocusToNextTab(currentTab) {
        if (currentTab === this.lastTab) {
            this.moveFocusToTab(this.firstTab);
        } else {
            const index = this.tabs.indexOf(currentTab);
            this.moveFocusToTab(this.tabs[index + 1]);
        }
    }

    moveFocusToTab(targetTab) {
        targetTab.focus();
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const allTabs = document.querySelectorAll('.tab-list');
    allTabs?.forEach(tabNodes => new TabComponent(tabNodes));
});


