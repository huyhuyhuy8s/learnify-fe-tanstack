import classnames from "classnames";
import TetrisLoader from "@/components/TetrisLoader";
import type { TSplitPanelProps } from "./type";
import "./style.scss";

const SplitPanel = <T extends { id: string }, S extends { id: string }>(
  props: TSplitPanelProps<T, S>
) => {
  const {
    levels,
    tabs,
    activeTab,
    onTabChange,
    items,
    selectedId,
    renderListHeader,
    renderItem,
    renderDetail,
    subItems,
    selectedSubId,
    onSelectSub,
    renderSubListHeader,
    renderSubItem,
    renderSubDetail,
    isLoading,
    isSubLoading,
    loader,
    placeholder,
    listClassName,
    detailClassName,
    subListClassName,
    subDetailClassName,
  } = props;

  const selectedItem = items.find((i) => i.id === selectedId) ?? null;
  const selectedSubItem =
    levels === 3 && selectedSubId && subItems
      ? (subItems.find((i) => i.id === selectedSubId) ?? null)
      : null;

  return (
    <div className="split-panel">
      {tabs && onTabChange && (
        <div className="split-panel__tabs">
          {tabs.map((tab) => (
            <button
              key={tab.value}
              onClick={() => onTabChange(tab.value)}
              className={classnames("split-panel__tab", {
                "split-panel__tab--active": activeTab === tab.value,
              })}
            >
              {tab.label}
            </button>
          ))}
        </div>
      )}

      <div
        className={classnames("split-panel__body", {
          "split-panel__body--3": levels === 3,
        })}
      >
        <div
          className={classnames("split-panel__list", listClassName)}
          data-lenis-prevent
        >
          {renderListHeader?.()}
          {isLoading
            ? (loader ?? <TetrisLoader size="md" speed="fast" />)
            : items.length > 0
              ? items.map((item, idx) => (
                  <div key={item.id}>
                    {renderItem(item, idx, selectedId === item.id)}
                  </div>
                ))
              : (placeholder ?? <p className="split-panel__empty">No items</p>)}
        </div>

        {levels === 2 ? (
          <div
            className={classnames(
              "split-panel__detail",
              "split-panel__detail--2",
              detailClassName
            )}
            data-lenis-prevent
          >
            {selectedItem
              ? renderDetail(selectedItem)
              : (placeholder ?? (
                  <div className="split-panel__placeholder">
                    <p>Select an item</p>
                  </div>
                ))}
          </div>
        ) : (
          <>
            <div
              className={classnames(
                "split-panel__detail",
                "split-panel__detail--3",
                subListClassName
              )}
              data-lenis-prevent
            >
              {!selectedItem ? (
                (placeholder ?? (
                  <div className="split-panel__placeholder">
                    <p>Select a course</p>
                  </div>
                ))
              ) : (
                <>
                  {renderSubListHeader?.()}
                  {isSubLoading
                    ? (loader ?? <TetrisLoader size="md" speed="fast" />)
                    : subItems && subItems.length > 0
                      ? subItems.map((item, idx) => (
                          <div
                            key={item.id}
                            onClick={() => onSelectSub?.(item.id)}
                          >
                            {renderSubItem?.(
                              item,
                              idx,
                              selectedSubId === item.id
                            )}
                          </div>
                        ))
                      : (placeholder ?? (
                          <div className="split-panel__placeholder">
                            <p>No sub-items</p>
                          </div>
                        ))}
                </>
              )}
            </div>

            <div
              className={classnames(
                "split-panel__sub-detail",
                subDetailClassName
              )}
              data-lenis-prevent
            >
              {selectedSubItem && renderSubDetail
                ? renderSubDetail(selectedSubItem)
                : (placeholder ?? (
                    <div className="split-panel__placeholder">
                      <p>Select a lesson</p>
                    </div>
                  ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default SplitPanel;
