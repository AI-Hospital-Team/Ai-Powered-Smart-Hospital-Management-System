import Skeleton from "./Skeleton";

function SkeletonAIHealthAssistant() {
  return (
    <div className="skeleton-ai-assistant">

      {/* HEADER */}
      <header className="skeleton-ai-header">
        <div className="skeleton-ai-header-content">

          <div className="skeleton-ai-brand">
            <Skeleton
              type="circle"
              width="46px"
              height="46px"
            />

            <div className="skeleton-ai-brand-text">
              <Skeleton width="175px" height="18px" />
              <Skeleton width="150px" height="10px" />
            </div>
          </div>

          <Skeleton
            width="130px"
            height="42px"
            className="skeleton-ai-back"
          />

        </div>
      </header>


      {/* MAIN */}
      <main className="skeleton-ai-main">

        {/* HERO */}
        <section className="skeleton-ai-hero">

          <Skeleton
            type="circle"
            width="125px"
            height="125px"
            className="skeleton-ai-hero-icon"
          />

          <Skeleton
            width="170px"
            height="28px"
            className="skeleton-ai-badge"
          />

          <Skeleton
            width="390px"
            height="32px"
            className="skeleton-ai-title"
          />

          <Skeleton
            width="620px"
            height="14px"
          />

          <Skeleton
            width="540px"
            height="14px"
          />

          {/* HERO FEATURES */}
          <div className="skeleton-ai-features">

            <div className="skeleton-ai-feature">
              <Skeleton
                type="circle"
                width="27px"
                height="27px"
              />

              <Skeleton
                width="75px"
                height="11px"
              />
            </div>

            <div className="skeleton-ai-feature">
              <Skeleton
                type="circle"
                width="27px"
                height="27px"
              />

              <Skeleton
                width="82px"
                height="11px"
              />
            </div>

            <div className="skeleton-ai-feature">
              <Skeleton
                type="circle"
                width="27px"
                height="27px"
              />

              <Skeleton
                width="95px"
                height="11px"
              />
            </div>

          </div>

        </section>


        {/* AI ANALYSIS CARD */}
        <section className="skeleton-ai-card">

          {/* CARD HEADER */}
          <div className="skeleton-ai-card-header">

            <div className="skeleton-ai-card-title">

              <Skeleton
                type="circle"
                width="44px"
                height="44px"
              />

              <div>
                <Skeleton width="120px" height="9px" />
                <Skeleton width="220px" height="18px" />
              </div>

            </div>

            <Skeleton
              width="78px"
              height="28px"
              className="skeleton-ai-status"
            />

          </div>


          {/* TEXTAREA */}
          <Skeleton
            width="100%"
            height="185px"
            className="skeleton-ai-textarea"
          />


          {/* CHARACTER COUNT */}
          <div className="skeleton-ai-character-count">
            <Skeleton
              width="115px"
              height="9px"
            />
          </div>


          {/* BUTTONS */}
          <div className="skeleton-ai-buttons">

            <Skeleton
              width="100%"
              height="48px"
            />

            <Skeleton
              width="105px"
              height="48px"
            />

          </div>


          {/* AI ANALYZING */}
          <div className="skeleton-ai-loading">

            <Skeleton
              type="circle"
              width="52px"
              height="52px"
              className="skeleton-ai-loading-icon"
            />

            <Skeleton
              width="230px"
              height="15px"
            />

            <Skeleton
              width="280px"
              height="10px"
            />

          </div>

        </section>


        {/* QUICK EXAMPLES */}
        <section className="skeleton-ai-examples">

          <div className="skeleton-ai-section-heading">

            <div>
              <Skeleton
                width="90px"
                height="8px"
              />

              <Skeleton
                width="190px"
                height="19px"
              />
            </div>

            <Skeleton
              type="circle"
              width="20px"
              height="20px"
            />

          </div>


          <div className="skeleton-ai-example-buttons">

            {/* Example 1 */}
            <div className="skeleton-ai-example">

              <Skeleton
                type="circle"
                width="42px"
                height="42px"
              />

              <div>
                <Skeleton
                  width="110px"
                  height="12px"
                />

                <Skeleton
                  width="125px"
                  height="9px"
                />
              </div>

            </div>


            {/* Example 2 */}
            <div className="skeleton-ai-example">

              <Skeleton
                type="circle"
                width="42px"
                height="42px"
              />

              <div>
                <Skeleton
                  width="120px"
                  height="12px"
                />

                <Skeleton
                  width="115px"
                  height="9px"
                />
              </div>

            </div>


            {/* Example 3 */}
            <div className="skeleton-ai-example">

              <Skeleton
                type="circle"
                width="42px"
                height="42px"
              />

              <div>
                <Skeleton
                  width="135px"
                  height="12px"
                />

                <Skeleton
                  width="130px"
                  height="9px"
                />
              </div>

            </div>

          </div>

        </section>


        {/* DISCLAIMER */}
        <section className="skeleton-ai-disclaimer">

          <Skeleton
            type="circle"
            width="34px"
            height="34px"
          />

          <div>

            <Skeleton
              width="145px"
              height="12px"
            />

            <Skeleton
              width="100%"
              height="10px"
            />

            <Skeleton
              width="90%"
              height="10px"
            />

            <Skeleton
              width="78%"
              height="10px"
            />

          </div>

        </section>

      </main>


      {/* FOOTER */}
      <footer className="skeleton-ai-footer">

        <div className="skeleton-ai-footer-brand">

          <Skeleton
            type="circle"
            width="35px"
            height="35px"
          />

          <div>
            <Skeleton
              width="250px"
              height="10px"
            />

            <Skeleton
              width="290px"
              height="8px"
            />
          </div>

        </div>

        <Skeleton
          width="145px"
          height="10px"
        />

      </footer>

    </div>
  );
}

export default SkeletonAIHealthAssistant;