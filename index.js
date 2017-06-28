import { h, app } from "hyperapp"
import { Router } from "hyperapp"


const HeaderSection = ({ state, go, slug }) => {
    console.log("slug", slug);
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
    const active = slug == "" ? "active" : ""
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
                        backgroundImage: `url("${homeContent.Image1.imagePath}`,
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
    console.log("workContent", workContent)
    
    return(
        <section class={`card work ${active}`} id="Work">
            <div class="title">
                <h2>{workContent.H1.body}</h2>
            </div>
            <div class="sub-info"
                oncreate={e => e.innerHTML = workContent.Blurb1.body}
                key="constant"
            >
            </div>

            <div class="project-container">
                <div class="project gurneys">
                    <div class="more-info scrum">
                        <div class="title">Gurneys Resorts</div>
                        <div class="btn see-more">See More</div>
                    </div>
                </div>
            </div>
        
        </section>
    );
}

const MainApp = ({ state, actions, slug }) => {
    console.log("state", state);
    if(state.content.length){
        return(
            <div class="container wrapper">
                <HeaderSection state={state} go={actions.router.go} slug={slug} />
                <main>
                    <Home state={state} slug={slug} />
                    <Work state={state} actions={actions} slug={slug} />
                </main>
            </div>
        );
    } else {
        return <div>Loading...</div>
    }
}

app({
  state: {
      content: []
  },
  view: [
      ["/", (state, actions) => <MainApp state={state} actions={actions} slug={""} />],
      ["/:slug", (state, actions) => <MainApp state={state} actions={actions} slug={state.router.params.slug} />],      
      ["*", (state, actions) => <MainApp state={state} actions={actions} />]
  ],
  actions: {
      getContent: (state, actions) => {
            fetch("http://localhost:5000/api/siteapi/10")
                .then(res => res.json())
                .then(( data ) => {
                    if(data.success == 1){
                        actions.setContent(data.content);
                    }
                })
      },
    setContent: (state, actions, content) => {
        
        content.forEach(page => {
            const newPageElObject = {};
            page.pageElements.forEach(el => {
                if(el.groupID){
                    if(newPageElObject[el.groupID]) {
                        newPageElObject[el.groupID][el.id] = el;
                    } else {
                        newPageElObject[el.groupID] = {};
                        newPageElObject[el.groupID][el.id] = el;                        
                    }
                } else {
                    newPageElObject[el.name] = el;
                }
            });

            page.pageElements = newPageElObject;
        });

        //ahhh why am i mutating state
        state.content = content;

        return state;
    }
  },
  events: {
    loaded: (state, actions) => (
        actions.getContent()
    )
  },
  mixins: [Router]
});