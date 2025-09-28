let mousePos = { x: 0, y: 0 };
let pointerGlow;
let sections;
let bouncyLetters;
let currentSection;
let skillGrids;
let videoBoxes;
let projectPreviewImgs;
let modal;
let modalTitle;
let modalExitBtn;
let projectPlayer;
let pointerIsInSectionOne;

// #region EVENTS
document.addEventListener('DOMContentLoaded', () => {
	GenerateWelcomeText();
	pointerGlow = document.querySelector("#pointer-glow");
	sections = document.querySelectorAll("section");
	bouncyLetters = document.querySelectorAll(".bouncy-letter");
	skillGrids = document.querySelectorAll(".skill-grid");
	videoBoxes = document.querySelectorAll(".video-box");
	projectPreviewImgs = document.querySelectorAll(".project-preview img");
	modal = document.querySelector(".modal");
	modalTitle = document.querySelector(".modal-title");
	modalExitBtn = document.querySelector(".modal-exit-button");
	modalExitBtn.onclick = function() {CloseModal()};
	projectPlayer = document.querySelector("#project-player");
});

window.addEventListener("scroll", () => {
	HandlePointerGlow();
	RefreshWelcomeText();
	RefreshSidebarHighlight();
	SkillGridElementsFadeIn();
	VideoBoxesSlideIn();
});

document.addEventListener('mousemove', (event) => {
	mousePos.x = event.clientX;
	mousePos.y = event.clientY;

	HandlePointerGlow();
	RefreshWelcomeText();
	RotateProjectPreviews();
});
// #endregion EVENTS

function GenerateWelcomeText()
{
	const container = document.querySelector('.welcome-container');
	const textContent = [
		"Welcome!", 
		"I'm Dániel (codename: Deniel)", 
		"Passionate full stack Game Developer programmer."
	];
	
	container.innerHTML += "<!-- Dynamically generated letters -->";
	for (let i = 0; i < textContent.length; i++)
	{
		container.innerHTML += textContent[i].split('').map(char => {
			if (char === ' ') 
			{
				return '<span class="space">&nbsp;</span>';
			}
			return `<span class="bouncy-letter">${char}</span>`;
		}).join('');
		container.innerHTML += "<br>";
	}
}

function OpenModal(link, title)
{
	modal.style.display = "block";
	projectPlayer.src = link;
	modalTitle.innerText = title;
}
function CloseModal()
{
	modal.style.display = "none";
	projectPlayer.src = "";
}


function HandlePointerGlow()
{
	if (pointerGlow == undefined) return;
	pointerIsInSectionOne = (sections[1].offsetTop - mousePos.y - pageYOffset) > 0;
	if (!pointerIsInSectionOne)
	{
		pointerGlow.style.opacity = 0;
		return;
	}

	pointerGlow.style.top = (mousePos.y - 50) + "px";
	pointerGlow.style.left = (mousePos.x - 50) + "px";

	var opac = (sections[1].offsetTop - mousePos.y - pageYOffset) / 100 * 0.1;
	if (opac > 0.1) opac = 0.1;
	pointerGlow.style.opacity = opac;
}

function RefreshWelcomeText()
{
	if (!pointerIsInSectionOne) return;

	for (let i = 0; i < bouncyLetters.length; i++) {
		const txt = bouncyLetters[i];
		const rect = txt.getBoundingClientRect();
		const divCenterX = rect.left + rect.width / 2;
		const divCenterY = rect.top + rect.height / 2;
		const dx = mousePos.x - divCenterX;
		const dy = mousePos.y - divCenterY;
		const distance = Math.sqrt(dx * dx + dy * dy);
		let size = 70 - (distance / 5);
		if (size < 30) size = 30;

		txt.style.fontSize = size + "px";
		var opacity = (1- distance / 1000);
		txt.style.opacity = opacity;
	}
}

function RotateProjectPreviews()
{
	for (let i = 0; i < projectPreviewImgs.length; i++)
	{
		const img = projectPreviewImgs[i];
		const rect = img.getBoundingClientRect();
		const divCenterX = rect.left + rect.width / 2;
		const divCenterY = rect.top + rect.height / 2;
		const dx = mousePos.x - divCenterX;
		const dy = mousePos.y - divCenterY;
		
		if (Math.abs(dx) > rect.width / 2 || Math.abs(dy) > rect.height / 2)
		{
			img.style.transform = `rotateX(0deg) rotateY(0deg)`;
			img.style.boxShadow = "none";
			continue;
		}

		img.style.transform = `rotateX(${(-dy / 2)}deg) rotateY(${(dx / 2)}deg)`;
		img.style.boxShadow = `${(-dx / 15)}px ${(-dy / 15)}px 2px 0px var(--color-light)`;
	}
}

function RefreshSidebarHighlight()
{
	const navLi = document.querySelectorAll(".sidenav ul li");
	
	sections.forEach(s => {
		const sectionTop = s.offsetTop;
		const sectionheight = s.clientHeight;
		if (pageYOffset >= (sectionTop - sectionheight / 3))
		{
			currentSection = s.getAttribute("id");
		}
	});
	
	navLi.forEach(li => {
		li.classList.remove("active");
		if (li.classList.contains(currentSection))
		{
			li.classList.add("active");
		}
	});
}

function SkillGridElementsFadeIn()
{
	for (let i = 0; i < skillGrids.length; i++)
	{
		const grid = skillGrids[i];
		var top = grid.getBoundingClientRect().top;
		var gap = top - window.innerHeight / 1.25;
		if (gap < 0) gap = 0;
		grid.style.gap = gap + "px";
	}
}

function VideoBoxesSlideIn()
{
	for (let i = 0; i < videoBoxes.length; i++)
	{
		const elem = videoBoxes[i];
		var top = elem.getBoundingClientRect().top;	
		var offsetY = top - window.innerHeight / 1.5;
		if (offsetY < 0) offsetY = 0;
		if (offsetY > window.innerWidth / 2.5) offsetY = window.innerWidth / 2.5;
		elem.style.paddingLeft = offsetY + "px";
	}
}