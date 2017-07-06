import { h, app } from "hyperapp"
import { Router } from "hyperapp"
import 'whatwg-fetch'


const HeaderSection = ({ state, go, slug }) => {

    return (
        <nav>
            {state.content.map(page => {
                var activeClass = page.link.substring(1, page.link.length) == slug ? "active" : "";
                
                return(
                    <div 
                        onclick={() => {
                            go(page.link)
                        }}
                        class={`nav-item ${page.title} ${page.title.toLowerCase()} ${activeClass} `}
                    >
                        <div class="hover-tool">{page.title}</div>
                    </div>
                )
            })}
        </nav>
    );
}

const Home = ({state, slug}) => {
    const active = slug == "" && state.content.length ? "active" : ""
    const homePage = state.content.find( page => {
        return page.link == "/"
    });
    const homeContent = homePage != undefined ? homePage.pageElements : {};
    
    
    return(
        <section class={`card home ${active}`} id="Home">
            <div class="intro">
                <div class="title">
                    <h1>{homeContent.H1.body}</h1>
                </div>
                <div class="sub-title">
                    <h3>{homeContent.H2.body}</h3>
                </div>
            </div>
            <div class="photo-container">
                <div 
                    class="profile-img" 
                    style={{
                        backgroundImage: `url("${homeContent.Image1.imagePath}")`,
                        backgroundSize: `cover`
                    }}
                >
                </div>
                <div class="next-arrow"></div>
            </div>
        </section>
    );
}

const Work = ({ state, actions, slug }) => {
    const active = slug == "work" ? "active" : ""
    const workPage = state.content.find( page => {
        return page.link == "/work"
    });
    const workContent = workPage.pageElements;
    const workSlides = workContent.Slides || [];
    
    return(
        <section class={`card work ${active}`} id="Work">
            <div class="title">
                <h2>{workContent.H1 ? workContent.H1.body : ''}</h2>
            </div>
            <div class="sub-info"
                oncreate={e => e.innerHTML = workContent.Blurb1 ? workContent.Blurb1.body : ''}
                key="constant"
            >
            </div>

            <div class="project-container">
                {workSlides.map(slide => {
                    return(
                        <div class={`project`}
                            onclick={() => actions.openModel(slide)}>
                            <div class="bg"
                                style={{backgroundImage: `url("${slide.Image1.imagePath}")`}}
                            >
                            </div>
                            <div class="more-info scrum">
                                <div class="title">{slide.H1.body}</div>
                                <div class="btn see-more">See More</div>
                            </div>
                        </div>
                    )
                })}
            </div>
        
        </section>
    );
}

const Modal = ({state, actions}) => {
    var content = state.workModalSlide;
    var open = state.workModalOpen ? "modal--open" : "modal--close"
    
    return (
        <div class={`modal md-effect-1 ${open}`}>
			<div class="modal__outer">
				<button class="overlay"></button>
				<div class="modal__inner">
					<div class="modal__content">
						<div class="modal__content--inner">
                            <ModalContent content={content} />
						</div>
						<button 
                            class="modal__close"
                            onclick={() => actions.closeModal()}
                        >
                            x
                        </button>
					</div>
				</div>
			</div>
		</div>
    );
}

const ModalContent = ({content}) => {
    if(Object.keys(content).length > 0){
        return (
            <div>
                <div class="image-container">
                    <div class="image desktop" 
                        style={{backgroundImage: `url(${content.Image1.imagePath})`}} 
                    />
                    { content.Image2.imagePath != null ?<div class="image mobile" 
                        style={{backgroundImage: `url(${content.Image2.imagePath})`}} 
                    /> : null }
                </div>
                <div class="proj-content-container">
                    <h2>{content.H2.body}</h2>
                    <p
                        oncreate={e => e.innerHTML = content.Blurb1 ? content.Blurb1.body : ''}
                        onupdate={e => e.innerHTML = content.Blurb1 ? content.Blurb1.body : ''}
                        
                    >
                    </p>
                    <button>
                        <a href={content.Link ? content.Link.path : ''} target="_blank">
                            {content.Link ? content.Link.linkTitle : ''} <span>></span>
                        </a>
                    </button>
                </div>
            </div>
        );
    } else return "";
}


const Contact = ({state, actions, slug}) => {
    const active = slug == "contact" ? "active" : ""
    const contactPage = state.content.find( page => {
        return page.link == "/contact"
    });
    const contactContent = contactPage.pageElements;
    const showLoader = state.formLoading ? "show" : ""
    
    

    return (
        <section class={`card contact ${active}`} id="Contact">
            <h2>{contactContent.H1.body}</h2>
            <div
                oncreate={e => e.innerHTML = contactContent.Blurb1.body}>
            </div>
            <form id="ContactForm" key={state.formSubmitted}>
                <div class="input-wrapper col-6 lpadr">
                    <input type="text" placeholder="Name" name="name" />
                </div>
                <div class="input-wrapper col-6 lpadl">
                    <input type="email" placeholder="Email" name="email" />
                </div>
                <div class="input-wrapper col-12">
                    <input type="text" placeholder="Subject" name="subject" />
                </div>
                <div class="input-wrapper col-12">
                    <textarea rows="8" placeholder="Message" name="message"></textarea>
                </div>
                <div class="btn-wrap">
                    <button type="button" onclick={() => actions.postForm("ContactForm")}>
                        Send Message
                    </button>
                    <div class={`loader ${showLoader}`}></div>
                </div>
            </form>
        </section>
    );
}

const MainApp = ({ state, actions, slug }) => {
    var formSuccessShow = state.formSubmitted && state.formSuccess ? "message-show" : "";
    var formErrorShow = state.formSubmitted && !state.formSuccess ? "message-show" : "";
    
    if(state.content.length){
        return(
            <div class="container wrapper"
                style={{backgroundImage: `url("../images/bg.jpg")`}}>
                <HeaderSection state={state} go={actions.router.go} slug={slug} />
                <main
                    style={{height: `${state.mainContainerSize}px`}}>
                    <Home state={state} slug={slug} />
                    <Work state={state} actions={actions} slug={slug} />
                    <Contact state={state} actions={actions} slug={slug} />
                </main>
                <Modal state={state} actions={actions} />
                <div class={`flash flash-success ${formSuccessShow}`}>Thank you. Your message has sent successfully! I will respond soon.</div>
                <div class={`flash flash-error ${formErrorShow}`}>Uh oh! Your message was not sent. Try checking your connection or shoot me a text!</div>
            </div>
        );
    } else {
        return <div>Loading...</div>
    }
}

app({
  state: {
      content: [],
      workModalOpen: false,
      workModalSlide: {},
      mainContainerSize: 400,
      formLoading: false,
      formSubmitted: false,
      formSuccess: 0
  },
  view: [
      ["/", (state, actions) => <MainApp state={state} actions={actions} slug={""} />],
      ["/:slug", (state, actions) => <MainApp state={state} actions={actions} slug={state.router.params.slug} />],      
      ["*", (state, actions) => <MainApp state={state} actions={actions} />]
  ],
  actions: {
      getContent: (state, actions) => {
            fetch("http://cms.garrettdev.xyz/api/siteapi/2")    
            .then(res => res.json())
            .then(( data ) => {
                if(data.success == 1){
                    actions.setContent(data.content);
                }
            });
      },
    
    setContent: (state, actions, content) => {

        const groups = {};

        content.groups.forEach(groupItem => {
            groups[groupItem.id] = groupItem;
        });
        
        content.pages.forEach(page => {
            const newPageElObject = {};
            
            page.pageElements.forEach(elGroup => {
                const group = groups[elGroup.groupID];
                
                if(elGroup.groupID){
                    newPageElObject[group.name] = [];
                    elGroup.elements.forEach(el => {
                        
                        if(!newPageElObject[group.name][el.sortOrder]){
                            newPageElObject[group.name][el.sortOrder] = {};                            
                        } 
                        newPageElObject[group.name][el.sortOrder][el.name] = el;                            
                    })
                } else {
                    elGroup.elements.forEach(el => {
                        newPageElObject[el.name] = el;
                    })
                }
            });

            page.pageElements = newPageElObject;
        });

        return ({content: content.pages});
    },

    openModel: (state, actions, slide) => ({workModalSlide: slide, workModalOpen: true}),

    closeModal: state => ({workModalOpen: false}),

    resizeMainContainerDelayed: (state, actions) => {
        //delayed to grab the DOM object
        window.setTimeout(actions.resizeMainContainer, 500);
    },

    resizeMainContainer: (state, actions) => {
        var activePage = document.querySelector('.card.active');
        
        if(!activePage){
            actions.resizeMainContainerDelayed();
            return state;
        }
        var activePageHeight = activePage.scrollHeight;

        if(activePageHeight == state.mainContainerSize){
            return state;
        }
        return ({mainContainerSize: activePageHeight});
    },

    postForm: (state, actions, formID) => {
        
        var form = document.querySelector(`#${formID}`);
        var formData = new FormData();
        
        [].slice.call(form.elements).forEach(el => {
            if(el.type != "button") {
                formData.append(el.name, el.value);
            }
        });
        
        fetch("http://cms.garrettdev.xyz/api/contact", {
            method: "POST",
            body: formData
        })
        .then(res => res.json())
        .then(( data ) => {
            actions.formResponse(data.success);
        });

        return ({formLoading: true});
    },

    formResponse: (state, actions, formSuccess) => {

        actions.delayedFormMessageClear();

        return({
            formSubmitted: new Date(), 
            formSuccess: formSuccess,
            formLoading: false
        })
    },

    delayedFormMessageClear: (state, actions) => {
        window.setTimeout(actions.formMessageClear, 5000);
    },

    formMessageClear: (state, actions) => ({formSuccess: false, formSubmitted: false}),

    addBrowserClasses: () => {
		var html = document.querySelector('html');
		var iOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
		var isAndroid = /(android)/i.test(navigator.userAgent);

        function addClass(el, className){
            if (el.classList)
            el.classList.add(className);
            else
            el.className += ' ' + className;
        }

		if(iOS){
			addClass(html, 'ios');
		} else if(isAndroid){
			addClass(html, 'android');
		}
	}
  },
  events: {
    
    loaded: (state, actions) => {
        actions.getContent();
        actions.addBrowserClasses();
    },
    
    route: (state, actions, data) => {
        actions.resizeMainContainerDelayed();
    }
  },
  mixins: [Router]
});